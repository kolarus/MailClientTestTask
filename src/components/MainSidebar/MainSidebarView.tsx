import "./MainSidebar.css";
import React from "react";
import { IconButton } from "./components/IconButton/IconButton";
import InboxIcon from "@/shared/icons/inbox-icon";
import { MiniLogo } from "./components/MiniLogo/MiniLogo";
import TrashIcon from "@/shared/icons/trash-icon";
import FolderIcon from "@/shared/icons/folder-icon";
import DraftIcon from "@/shared/icons/draft-icon";
import type { SidebarFolder } from "./main-sidebar-state";

export interface ViewProps {
  folders: readonly SidebarFolder[];
  selectedFolder: string;
  isLoading: boolean;
  error: string | null;
  onSelectedFolderChange: (folderId: string) => void;
}

const FolderIconsMap: Record<string, React.ReactNode> = {
  inbox: <InboxIcon />,
  draft: <DraftIcon />,
  folder: <FolderIcon />,
  trash: <TrashIcon />,
};

const getFolderIcon = (folderId: string) => {
  const icon = FolderIconsMap[folderId];

  if (!icon) {
    return <FolderIcon />;
  } else {
    return icon;
  }
};

export const MainSidebarView: React.FC<ViewProps> = (props) => {
  return (
    <div className="main-sidebar">
      <MiniLogo />
      {props.isLoading ? (
        <div className="main-sidebar__loading-skeleton">
          {/* Show skeleton loading for folders */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="main-sidebar__skeleton-folder">
              <div className="main-sidebar__skeleton-icon"></div>
            </div>
          ))}
        </div>
      ) : props.error ? (
        <div className="main-sidebar__error-state">
          <div className="main-sidebar__error-message">
            Failed to load folders
          </div>
        </div>
      ) : (
        props.folders.map((folder) => (
          <IconButton
            key={folder.id}
            onClick={() => props.onSelectedFolderChange(folder.id)}
            isSelected={props.selectedFolder === folder.id}
            label={folder.name}
          >
            {getFolderIcon(folder.id)}
          </IconButton>
        ))
      )}
    </div>
  );
};
