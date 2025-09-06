import { ContainerBuilder, type Resolve } from "jet-blaze/di";
import { sidebarModule } from "./sidebar-module";
import { emailListModule } from "./email-list-module";
import { messagesContainerModule } from "./messages-container-module";

export const createContainer = (): Resolve => {
  const builder = new ContainerBuilder();

  builder.registerModule(sidebarModule);
  builder.registerModule(emailListModule);
  builder.registerModule(messagesContainerModule);

  return builder.build();
};
