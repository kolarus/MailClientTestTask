import { connect, type Controller } from "jet-blaze/connector";
import { MainSidebarView, type ViewProps } from "./MainSidebarView.tsx";
import { mainSidebarControllerKey } from "./main-sidebar-controller-key.ts";
import type { MainSidebarStateService } from "./main-sidebar-state.ts";
import { tap } from "rxjs";

export interface Props {}

export function createMainSidebarController(
  mainSidebarService: MainSidebarStateService,
): Controller<Props, ViewProps> {
  return ({ onSelectedFolderChange$, mount$ }) => {
    const onSelectedFolderChangeEffect$ = onSelectedFolderChange$.pipe(
      tap((fodlerId) => mainSidebarService.selectFolder(fodlerId)),
    );

    const loadFoldersOnMountEffect$ = mount$.pipe(
      tap(() => mainSidebarService.loadFolders()),
    );

    return {
      viewState: {
        folders: [mainSidebarService.folders$, []],
        selectedFolder: [mainSidebarService.selectedFolder$, ""],
        isLoading: [mainSidebarService.isLoading$, false],
        error: [mainSidebarService.error$, null],
      },
      effects: [onSelectedFolderChangeEffect$, loadFoldersOnMountEffect$],
    };
  };
}

export const MainSidebar = connect(MainSidebarView, mainSidebarControllerKey);
