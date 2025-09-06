import React from "react";
import cn from "classnames";
import "./IconButton.css";

export interface IconButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  label?: string;
}

export const IconButton: React.FC<IconButtonProps> = (props) => (
  <div
    onClick={props.onClick}
    className={cn("icon-button", {
      ["icon-button--selected"]: props.isSelected,
    })}
  >
    <div className="icon-button__icon">{props.children}</div>
    {props.label && <div className="icon-button__label">{props.label}</div>}
  </div>
);
