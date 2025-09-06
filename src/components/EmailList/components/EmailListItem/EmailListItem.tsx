import "./EmailListItem.css";
import React from "react";
import cn from "classnames";
import { formatEmailDate } from "@/shared/utils/date-formatter";
import { ContextMenu } from "@/shared/components/ContextMenu/ContextMenu";
import { useContextMenu } from "./hooks/useContextMenu";

export interface EmailListItemProps {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  isSelected: boolean;
  isRead: boolean;
  onClick: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmailListItem: React.FC<EmailListItemProps> = ({
  id,
  from,
  subject,
  content,
  date,
  isSelected,
  isRead,
  onClick,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}) => {
  const {
    contextMenu,
    handleContextMenu,
    closeContextMenu,
    contextMenuOptions,
  } = useContextMenu({
    id,
    isRead,
    onMarkAsRead,
    onMarkAsUnread,
    onDelete,
  });

  return (
    <>
      <div
        className={cn("email-list-item", {
          "email-list-item--selected": isSelected,
          "email-list-item--unread": !isRead,
        })}
        onClick={onClick}
        onContextMenu={handleContextMenu}
      >
        <div className="email-list-item__from">{from}</div>
        <div className="email-list-item__subject">{subject}</div>
        <div className="email-list-item__content-preview">{content}</div>
        <div className="email-list-item__date">{formatEmailDate(date)}</div>
      </div>
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        options={contextMenuOptions}
        onClose={closeContextMenu}
      />
    </>
  );
};
