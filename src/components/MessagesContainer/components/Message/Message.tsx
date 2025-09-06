import "./Message.css";
import React from "react";
import { formatEmailDate } from "@/shared/utils/date-formatter";

export interface MessageProps {
  from: string;
  subject: string;
  date: string;
  content: string;
}

export const Message: React.FC<MessageProps> = ({
  from,
  subject,
  date,
  content,
}) => (
  <div className="messages-container__message">
    <div className="messages-container__message-from">
      <strong>From:</strong> {from}
    </div>
    <div className="messages-container__message-subject">
      <strong>Subject:</strong> {subject}
    </div>
    <div className="messages-container__message-date">
      <strong>Date:</strong> {formatEmailDate(date)}
    </div>
    <div className="messages-container__message-content">{content}</div>
  </div>
);
