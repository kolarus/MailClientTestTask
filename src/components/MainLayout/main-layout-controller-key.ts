import type { Controller } from "jet-blaze/connector";
import { key } from "jet-blaze/di";
import type { Props } from "./MainLayout.ts";
import type { ViewProps } from "./MainLayoutView.tsx";

export const mainLayoutControllerKey = key<Controller<Props, ViewProps>>(
  "MainLayoutController",
);
