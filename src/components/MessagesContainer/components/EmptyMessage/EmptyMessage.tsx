import React from "react";
import "./EmptyMessage.css";

export const EmptyMessage: React.FC = () => (
  <div className="messages-container__empty">
    <div className="empty-message__content">
      <h2 className="empty-message__title">No message selected</h2>
      <p className="empty-message__subtitle">
        Choose an email from your inbox to read it here
      </p>
    </div>
  </div>
);
