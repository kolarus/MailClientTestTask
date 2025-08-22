import React from "react";
import "./main-layout.css";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <>
      <div className="main-contact">
        <span>
            Spark TestTask by <u>Bohdan Morozov</u>
        </span>
        <span>
            📧 email: <u>road2ps@gmail.com</u> (do not write emails via this client 😉)
            💬 tg: <u>@kolarus</u>
        </span>
      </div>
      <div className="main-layout">
        {props.children}
      </div>
    </>
  );
};
