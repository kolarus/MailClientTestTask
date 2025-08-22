import React from "react";
import "./messages-container.css";
import { EmptyMessage } from "./components/empty-message/empty-message";

export const MessagesContainer: React.FC = () => {
  return (
    <div className="messages-container">
      <EmptyMessage />
    </div>
  );
};
