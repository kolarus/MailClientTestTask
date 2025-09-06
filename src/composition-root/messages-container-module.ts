import { key, type Module } from "jet-blaze/di";
import { messagesContainerControllerKey } from "@/components/MessagesContainer/messages-container-controller-key";
import { createMessagesContainerController } from "@/components/MessagesContainer/MessagesContainer";
import {
  createMessagesContainerStateService,
  type MessagesContainerStateService,
} from "@/components/MessagesContainer/messages-container-state";
import { emailListStateServiceKey } from "./email-list-module";

export const messagesContainerStateServiceKey =
  key<MessagesContainerStateService>("MessagesContainerStateService");

export const messagesContainerModule: Module = (container) => {
  container.register(messagesContainerStateServiceKey, (c) =>
    createMessagesContainerStateService(c.resolve(emailListStateServiceKey)),
  );

  container.register(messagesContainerControllerKey, (c) =>
    createMessagesContainerController(
      c.resolve(messagesContainerStateServiceKey),
    ),
  );
};
