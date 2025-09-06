import type { Controller } from "jet-blaze/connector";
import { key } from "jet-blaze/di";
import type { Props } from "./MainSidebar.ts";
import type { ViewProps } from "./MainSidebarView.tsx";

export const mainSidebarControllerKey = key<Controller<Props, ViewProps>>(
  "MainSidebarController",
);
