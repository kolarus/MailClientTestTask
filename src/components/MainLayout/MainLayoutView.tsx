import React from "react";
import "./MainLayout.css";

export interface ViewProps {
  children: React.ReactNode;
}

export const MainLayoutView: React.FC<ViewProps> = (props) => (
  <>
    <div className="main-contact">
      <span>
        Spark TestTask by <u>Bohdan Morozov</u>
      </span>
      <span>
        📧 email: <u>road2ps@gmail.com</u> (do not write emails via this client
        😉) 💬 tg:
        <u>@kolarus</u>
      </span>
    </div>
    <div className="main-layout">{props.children}</div>
  </>
);
