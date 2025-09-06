import { useState } from "react";
import { type ContextMenuOption } from "@/shared/components/ContextMenu/ContextMenu";

interface UseContextMenuProps {
  id: string;
  isRead: boolean;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

export const useContextMenu = ({
  id,
  isRead,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}: UseContextMenuProps) => {
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
  });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      isOpen: true,
      position: { x: event.clientX, y: event.clientY },
    });
  };

  const closeContextMenu = () => {
    setContextMenu((prev) => ({ ...prev, isOpen: false }));
  };

  const contextMenuOptions: ContextMenuOption[] = [
    {
      label: isRead ? "Mark as unread" : "Mark as read",
      onClick: () => {
        if (isRead) {
          onMarkAsUnread(id);
        } else {
          onMarkAsRead(id);
        }
      },
    },
    {
      label: "Delete",
      onClick: () => onDelete(id),
    },
  ];

  return {
    contextMenu,
    handleContextMenu,
    closeContextMenu,
    contextMenuOptions,
  };
};
