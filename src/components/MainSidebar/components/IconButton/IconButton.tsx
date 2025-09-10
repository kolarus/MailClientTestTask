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
    className={cn("main-sidebar__icon-button", {
      ["main-sidebar__icon-button--selected"]: props.isSelected,
    })}
  >
    <div className="main-sidebar__icon-button__icon">{props.children}</div>
    {props.label && (
      <div className="main-sidebar__icon-button__label">{props.label}</div>
    )}
  </div>
);
