import React, { useEffect, useRef } from "react";
import "./ContextMenu.css";

export interface ContextMenuOption {
  label: string;
  onClick: () => void;
}

export interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  options: ContextMenuOption[];
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  options,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
    >
      {options.map((option, index) => (
        <div
          key={index}
          className="context-menu__option"
          onClick={() => {
            option.onClick();
            onClose();
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};
