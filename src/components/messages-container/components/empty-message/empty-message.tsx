import React from "react";
import "./empty-message.css";

export const EmptyMessage: React.FC = () => {
  return (
    <div className="messages-container-empty">
      Hi There! <br/>
      Welcome to the best email client
    </div>
  );
};
