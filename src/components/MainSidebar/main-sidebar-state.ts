import {
  type Observable,
  scan,
  share,
  startWith,
  Subject,
  from,
  switchMap,
  catchError,
  of,
  map,
  merge,
} from "rxjs";
import { createStateSelector } from "@/shared/utils/state-selectors";
import { API_ENDPOINTS } from "@/shared/api";

export interface MainSidebarStateService {
  readonly selectFolder: (id: string) => void;
  readonly loadFolders: () => void;

  readonly folders$: Observable<readonly SidebarFolder[]>;
  readonly selectedFolder$: Observable<string>;
  readonly isLoading$: Observable<boolean>;
  readonly error$: Observable<string | null>;
}

export type SidebarFolder = {
  id: string;
  name: string;
};

const enum ActionType {
  SelectFolder,
  LoadFoldersStart,
  LoadFoldersSuccess,
  LoadFoldersError,
}

type Actions =
  | { type: ActionType.SelectFolder; id: string }
  | { type: ActionType.LoadFoldersStart }
  | { type: ActionType.LoadFoldersSuccess; folders: readonly SidebarFolder[] }
  | { type: ActionType.LoadFoldersError; error: string };

type State = {
  readonly folders: readonly SidebarFolder[];
  readonly selectedFolder: string;
  readonly isLoading: boolean;
  readonly error: string | null;
};

const initialState: State = {
  selectedFolder: "",
  folders: [],
  isLoading: false,
  error: null,
};

const fetchFolders = async (): Promise<SidebarFolder[]> => {
  const response = await fetch(API_ENDPOINTS.folders);

  if (!response.ok) {
    throw new Error(`Failed to fetch folders: ${response.statusText}`);
  }

  return await response.json();
};

export const createMainSidebarService = (): MainSidebarStateService &
  Disposable => {
  const actions$ = new Subject<Actions>();
  const loadFolders$ = new Subject<void>();

  const folderLoading$ = loadFolders$.pipe(
    switchMap(() =>
      from(fetchFolders()).pipe(
        map(
          (folders): Actions => ({
            type: ActionType.LoadFoldersSuccess,
            folders,
          }),
        ),
        catchError(
          (error): Observable<Actions> =>
            of({ type: ActionType.LoadFoldersError, error: error.message }),
        ),
        startWith({ type: ActionType.LoadFoldersStart } as Actions),
      ),
    ),
  );

  const allActions$ = merge(actions$, folderLoading$);

  const state$ = allActions$.pipe(
    scan((state, action) => {
      switch (action.type) {
        case ActionType.SelectFolder:
          return {
            ...state,
            selectedFolder: action.id,
          };
        case ActionType.LoadFoldersStart:
          return {
            ...state,
            isLoading: true,
            error: null,
          };
        case ActionType.LoadFoldersSuccess:
          return {
            ...state,
            folders: action.folders,
            isLoading: false,
            error: null,
            selectedFolder:
              state.selectedFolder || (action.folders[0]?.id ?? ""),
          };
        case ActionType.LoadFoldersError:
          return {
            ...state,
            isLoading: false,
            error: action.error,
          };
        default: {
          return state;
        }
      }
    }, initialState),
    startWith(initialState),
    share(),
  );

  const createSelector = createStateSelector(state$, initialState);
  const folders$ = createSelector("folders");
  const selectedFolder$ = createSelector("selectedFolder");
  const isLoading$ = createSelector("isLoading");
  const error$ = createSelector("error");

  return {
    selectFolder: (id: string) =>
      actions$.next({ type: ActionType.SelectFolder, id }),
    loadFolders: () => loadFolders$.next(),
    folders$,
    selectedFolder$,
    isLoading$,
    error$,
    [Symbol.dispose]: () =>
      [actions$, loadFolders$].forEach((i) => i.complete()),
  };
};
