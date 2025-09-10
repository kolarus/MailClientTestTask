import { DIContainer } from "jet-blaze/di-react";
import { createContainer } from "@/composition-root/composition-root.ts";

import { MainLayout } from "@/components/MainLayout/MainLayout";
import { MainSidebar } from "@/components/MainSidebar/MainSidebar";
import { EmailList } from "@/components/EmailList/EmailList";
import { MessagesContainer } from "@/components/MessagesContainer/MessagesContainer";

function App() {
  return (
    <DIContainer container={createContainer}>
      <MainLayout>
        <MainSidebar />
        <EmailList />
        <MessagesContainer />
      </MainLayout>
    </DIContainer>
  );
}

export default App;
