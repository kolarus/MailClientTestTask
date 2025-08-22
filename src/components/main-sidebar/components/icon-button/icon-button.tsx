import React from "react";
import "./icon-button.css";

export interface IconButtonProps {
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <div className="icon-button">
      {props.children}
    </div>
  );
};
