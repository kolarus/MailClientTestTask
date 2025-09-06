import type { Controller } from "jet-blaze/connector";
import { key } from "jet-blaze/di";
import type { Props } from "./MessagesContainer.ts";
import type { ViewProps } from "./MessagesContainerView.tsx";

export const messagesContainerControllerKey = key<Controller<Props, ViewProps>>(
  "MessagesContainerController",
);
