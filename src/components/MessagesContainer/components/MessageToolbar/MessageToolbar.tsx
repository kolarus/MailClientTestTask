import React from "react";
import "./MessageToolbar.css";

export interface MessageToolbarProps {
  onDeleteMessage: () => void;
  onMarkAsRead: () => void;
  onMarkAsUnread: () => void;
  isRead: boolean;
}

export const MessageToolbar: React.FC<MessageToolbarProps> = ({
  onDeleteMessage,
  onMarkAsRead,
  onMarkAsUnread,
  isRead,
}) => (
  <div className="messages-container__toolbar">
    {isRead ? (
      <div
        className="messages-container__toolbar-button"
        onClick={onMarkAsUnread}
      >
        ✉️ Mark As Unread
      </div>
    ) : (
      <div
        className="messages-container__toolbar-button"
        onClick={onMarkAsRead}
      >
        ✅ Mark As Read
      </div>
    )}
    <div
      className="messages-container__toolbar-button"
      onClick={onDeleteMessage}
    >
      ❌ Delete
    </div>
  </div>
);
