import { key, type Module } from "jet-blaze/di";
import { emailListControllerKey } from "@/components/EmailList/email-list-controller-key";
import { createEmailListController } from "@/components/EmailList/EmailList";
import {
  createEmailListStateService,
  type EmailListStateService,
} from "@/components/EmailList/email-list-state";
import { mainSidebarServiceKey } from "./sidebar-module";

export const emailListStateServiceKey = key<EmailListStateService>(
  "EmailListStateService",
);

export const emailListModule: Module = (container) => {
  container.register(emailListStateServiceKey, (c) =>
    createEmailListStateService(c.resolve(mainSidebarServiceKey)),
  );

  container.register(emailListControllerKey, (c) =>
    createEmailListController(
      c.resolve(emailListStateServiceKey),
      c.resolve(mainSidebarServiceKey),
    ),
  );
};
