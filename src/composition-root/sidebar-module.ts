import { key, type Module } from "jet-blaze/di";
import { mainSidebarControllerKey } from "@/components/MainSidebar/main-sidebar-controller-key";
import { createMainSidebarController } from "@/components/MainSidebar/MainSidebar";
import {
  createMainSidebarService,
  type MainSidebarStateService,
} from "@/components/MainSidebar/main-sidebar-state";

export const mainSidebarServiceKey = key<MainSidebarStateService>(
  "MainSidebarStateService",
);

export const sidebarModule: Module = (container) => {
  container.register(mainSidebarServiceKey, () => createMainSidebarService());

  container.register(mainSidebarControllerKey, (c) =>
    createMainSidebarController(c.resolve(mainSidebarServiceKey)),
  );
};
