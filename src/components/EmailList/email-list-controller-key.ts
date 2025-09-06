import type { Controller } from "jet-blaze/connector";
import { key } from "jet-blaze/di";
import type { Props } from "./EmailList.ts";
import type { ViewProps } from "./EmailListView.tsx";

export const emailListControllerKey = key<Controller<Props, ViewProps>>(
  "EmailListController",
);
