import "./main-sidebar.css";
import React from "react";
import { IconButton } from "./components/icon-button/icon-button";
import InboxIcon from "@/shared/icons/inbox-icon";
import { MiniLogo } from "./components/mini-logo/mini-logo";
import TrashIcon from "@/shared/icons/trash-icon";
import FolderIcon from "@/shared/icons/folder-icon";
import DraftIcon from "@/shared/icons/draft-icon";

export const MainSidebar: React.FC = () => {
  return (
    <div className="main-sidebar">
      <MiniLogo /> 
      <IconButton>
        <InboxIcon />
      </IconButton>
      <IconButton>
        <DraftIcon />
      </IconButton>
      <IconButton>
        <FolderIcon />
      </IconButton>
      <IconButton>
        <TrashIcon />
      </IconButton>
    </div>
  );
};
