import React from "react";
import "./MessagesContainer.css";
import { EmptyMessage } from "./components/EmptyMessage/EmptyMessage";
import { MessageToolbar } from "./components/MessageToolbar/MessageToolbar";
import { Message } from "./components/Message/Message";
import type { Email } from "../EmailList/email-list-state";

export interface ViewProps {
  selectedMessage: Email | null;
  onDeleteMessage: (emailId: string) => void;
  onMarkAsRead: (emailId: string) => void;
  onMarkAsUnread: (emailId: string) => void;
}

export const MessagesContainerView: React.FC<ViewProps> = ({
  selectedMessage,
  onDeleteMessage,
  onMarkAsRead,
  onMarkAsUnread,
}) => {
  return (
    <div className="messages-container">
      {selectedMessage ? (
        <>
          <MessageToolbar
            onDeleteMessage={() => onDeleteMessage(selectedMessage.id)}
            onMarkAsRead={() => onMarkAsRead(selectedMessage.id)}
            onMarkAsUnread={() => onMarkAsUnread(selectedMessage.id)}
            isRead={selectedMessage.isRead}
          />
          <Message
            from={selectedMessage.from}
            subject={selectedMessage.subject}
            date={selectedMessage.date}
            content={selectedMessage.content}
          />
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};
