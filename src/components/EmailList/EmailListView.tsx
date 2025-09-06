import "./EmailList.css";
import React from "react";
import { EmailListItem } from "./components/EmailListItem/EmailListItem";
import type { Email } from "./email-list-state";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

export interface ViewProps {
  emails: readonly Email[];
  selectedEmail: string;
  isLoading: boolean;
  error: string | null;
  selectedFolder: string;
  onSelectedEmailChange: (emailId: string) => void;
  onMarkAsRead: (emailId: string) => void;
  onMarkAsUnread: (emailId: string) => void;
  onDelete: (emailId: string) => void;
  onAddEmail: () => void;
}

export const EmailListView: React.FC<ViewProps> = ({
  emails,
  selectedEmail,
  isLoading,
  error,
  selectedFolder,
  onSelectedEmailChange,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onAddEmail,
}) => {
  const containerRef = useKeyboardNavigation({
    emails,
    selectedEmail,
    onSelectEmail: onSelectedEmailChange,
    onDeleteEmail: onDelete,
  });

  return (
    <div className="email-list-container">
      <div
        ref={containerRef}
        className="email-list"
        tabIndex={0}
        style={{ outline: "none" }}
      >
        {isLoading || !selectedFolder ? (
          <div className="email-list__loading">Loading emails...</div>
        ) : error ? (
          <div className="email-list__error">Error: {error}</div>
        ) : emails.length === 0 ? (
          <div className="email-list__empty">No emails</div>
        ) : (
          emails.map((email) => (
            <EmailListItem
              key={email.id}
              id={email.id}
              from={email.from}
              subject={email.subject}
              content={email.content}
              date={email.date}
              isSelected={selectedEmail === email.id}
              isRead={email.isRead}
              onClick={() => onSelectedEmailChange(email.id)}
              onMarkAsRead={onMarkAsRead}
              onMarkAsUnread={onMarkAsUnread}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
      <button
        className="add-email-button"
        onClick={onAddEmail}
        disabled={!selectedFolder}
        title="Add Email"
      >
        +
      </button>
    </div>
  );
};
