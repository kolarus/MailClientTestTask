import React from "react";
import "./mini-logo.css";
import LogoIcon from "@/shared/icons/logo-icon";

export const MiniLogo: React.FC = () => {
  return (
    <div className="main-sidebar__mini-logo">
      <LogoIcon />
    </div>
  );
};
