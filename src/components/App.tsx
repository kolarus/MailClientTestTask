import "./App.css";

import { DIContainer } from "jet-blaze/di-react";
import { createContainer } from "../composition-root/composition-root.ts";

import { MainLayout } from "@/components/main-layout/main-layout.tsx";
import { MainSidebar } from "@/components/main-sidebar/main-sidebar.tsx";
import { EmailList } from "@/components/email-list/email-list.tsx";
import { MessagesContainer } from "./messages-container/messages-container.tsx";

function App() {
  return (
    <DIContainer container={createContainer}>
      <MainLayout>
        <MainSidebar />
        <EmailList />
        <MessagesContainer />
      </MainLayout>
      {/* <div className="app-container">
        <div className="logo-container">
          <img
            src="https://github.com/readdle/jet-blaze/blob/main/assets/logo/jet-blaze-logo-128x128.png?raw=true"
            alt="Jet-Blaze Logo"
          />
        </div>
        <h1>Jet-Blaze App</h1>
        <p className="description">
          Jet-Blaze is a cutting-edge framework <br />
          for building single-page applications using TypeScript, React, and
          RxJS.
        </p>

        <InputCounter />
      </div> */}
    </DIContainer>
  );
}

export default App;
