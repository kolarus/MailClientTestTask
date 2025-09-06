import React from "react";
import "./MiniLogo.css";
import LogoIcon from "@/shared/icons/logo-icon";

export interface MiniLogoProps {}

export const MiniLogo: React.FC<MiniLogoProps> = () => (
  <div className="main-sidebar__mini-logo">
    <LogoIcon />
  </div>
);
