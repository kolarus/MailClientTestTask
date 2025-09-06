import {
  map,
  type Observable,
  shareReplay,
  scan,
  share,
  startWith,
  Subject,
  from,
  catchError,
  of,
  merge,
  combineLatest,
} from "rxjs";
import type { MainSidebarStateService } from "../MainSidebar/main-sidebar-state";
import { createStateSelector } from "@/shared/utils/state-selectors";

export interface EmailListStateService {
  readonly selectEmail: (id: string) => void;
  readonly clearSelectedEmail: () => void;
  readonly markEmailAsRead: (id: string) => void;
  readonly markEmailAsUnread: (id: string) => void;
  readonly deleteEmail: (id: string) => void;
  readonly addEmail: (email: Email) => void;
  readonly emails$: Observable<readonly Email[]>;
  readonly selectedEmail$: Observable<string>;
  readonly isLoading$: Observable<boolean>;
  readonly error$: Observable<string | null>;
}

export type Email = {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  folderId: string;
  isRead: boolean;
  isDeleted: boolean;
};

const enum ActionType {
  SelectEmail,
  ClearSelectedEmail,
  MarkEmailAsRead,
  MarkEmailAsUnread,
  DeleteEmail,
  AddEmail,
  LoadEmailsStart,
  LoadEmailsSuccess,
  LoadEmailsError,
}

type Actions =
  | {
      type: ActionType.SelectEmail;
      id: string;
    }
  | {
      type: ActionType.ClearSelectedEmail;
    }
  | {
      type: ActionType.MarkEmailAsRead;
      id: string;
    }
  | {
      type: ActionType.MarkEmailAsUnread;
      id: string;
    }
  | {
      type: ActionType.DeleteEmail;
      id: string;
    }
  | {
      type: ActionType.AddEmail;
      email: Email;
    }
  | { type: ActionType.LoadEmailsStart }
  | { type: ActionType.LoadEmailsSuccess; emails: readonly Email[] }
  | { type: ActionType.LoadEmailsError; error: string };

type State = {
  readonly emails: Email[];
  readonly selectedEmail: string;
  readonly isLoading: boolean;
  readonly error: string | null;
};

const initialState: State = {
  selectedEmail: "",
  emails: [],
  isLoading: true,
  error: null,
};

const fetchEmails = async (): Promise<Email[]> => {
  const response = await fetch("http://localhost:3001/api/emails");

  if (!response.ok) {
    throw new Error(`Failed to fetch emails: ${response.statusText}`);
  }

  return await response.json();
};

export const createEmailListStateService = (
  sidebarService: MainSidebarStateService,
): EmailListStateService & Disposable => {
  const actions$ = new Subject<Actions>();

  const emailLoading$ = from(fetchEmails()).pipe(
    map(
      (emails): Actions => ({
        type: ActionType.LoadEmailsSuccess,
        emails,
      }),
    ),
    catchError(
      (error): Observable<Actions> =>
        of({ type: ActionType.LoadEmailsError, error: error.message }),
    ),
    startWith({ type: ActionType.LoadEmailsStart } as Actions),
  );

  const allActions$ = merge(actions$, emailLoading$);

  const state$ = allActions$.pipe(
    scan((state, action) => {
      switch (action.type) {
        case ActionType.SelectEmail: {
          const updatedEmailsOnSelect = state.emails.map((email) =>
            email.id === action.id ? { ...email, isRead: true } : email,
          );
          return {
            ...state,
            selectedEmail: action.id,
            emails: updatedEmailsOnSelect,
          };
        }
        case ActionType.ClearSelectedEmail:
          return {
            ...state,
            selectedEmail: "",
          };
        case ActionType.MarkEmailAsRead:
          return {
            ...state,
            emails: state.emails.map((email) =>
              email.id === action.id ? { ...email, isRead: true } : email,
            ),
          };
        case ActionType.MarkEmailAsUnread:
          return {
            ...state,
            emails: state.emails.map((email) =>
              email.id === action.id ? { ...email, isRead: false } : email,
            ),
          };
        case ActionType.DeleteEmail:
          return {
            ...state,
            emails: state.emails.map((email) =>
              email.id === action.id ? { ...email, isDeleted: true } : email,
            ),
            selectedEmail:
              state.selectedEmail === action.id ? "" : state.selectedEmail,
          };
        case ActionType.AddEmail:
          return {
            ...state,
            emails: [...state.emails, action.email],
          };
        case ActionType.LoadEmailsStart:
          return {
            ...state,
            isLoading: true,
            error: null,
          };
        case ActionType.LoadEmailsSuccess:
          return {
            ...state,
            emails: action.emails as Email[],
            isLoading: false,
            error: null,
          };
        case ActionType.LoadEmailsError:
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
  const selectedEmail$ = createSelector("selectedEmail");
  const isLoading$ = createSelector("isLoading");
  const error$ = createSelector("error");

  const emails$ = combineLatest([state$, sidebarService.selectedFolder$]).pipe(
    map(([state, selectedFolder]) => {
      if (!selectedFolder || state.isLoading) {
        return [];
      }

      return state.emails
        .filter(
          (email) => email.folderId === selectedFolder && !email.isDeleted,
        )
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }),
    shareReplay(1),
  );

  return {
    selectEmail: (id: string) =>
      actions$.next({ type: ActionType.SelectEmail, id }),
    clearSelectedEmail: () =>
      actions$.next({ type: ActionType.ClearSelectedEmail }),
    markEmailAsRead: (id: string) =>
      actions$.next({ type: ActionType.MarkEmailAsRead, id }),
    markEmailAsUnread: (id: string) =>
      actions$.next({ type: ActionType.MarkEmailAsUnread, id }),
    deleteEmail: (id: string) =>
      actions$.next({ type: ActionType.DeleteEmail, id }),
    addEmail: (email: Email) =>
      actions$.next({ type: ActionType.AddEmail, email }),
    emails$,
    selectedEmail$,
    isLoading$,
    error$,
    [Symbol.dispose]: () => [actions$].forEach((i) => i.complete()),
  };
};
