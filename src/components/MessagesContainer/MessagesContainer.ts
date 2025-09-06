import { connect, type Controller } from "jet-blaze/connector";
import {
  MessagesContainerView,
  type ViewProps,
} from "./MessagesContainerView.tsx";
import { messagesContainerControllerKey } from "./messages-container-controller-key.ts";
import type { MessagesContainerStateService } from "./messages-container-state.ts";
import { tap } from "rxjs";

export interface Props {}

export function createMessagesContainerController(
  messagesContainerService: MessagesContainerStateService,
): Controller<Props, ViewProps> {
  return ({ onDeleteMessage$, onMarkAsRead$, onMarkAsUnread$ }) => {
    const onDeleteMessageEffect$ = onDeleteMessage$.pipe(
      tap((emailId) => messagesContainerService.deleteMessage(emailId)),
    );

    const onMarkAsReadEffect$ = onMarkAsRead$.pipe(
      tap((emailId) => messagesContainerService.markAsRead(emailId)),
    );

    const onMarkAsUnreadEffect$ = onMarkAsUnread$.pipe(
      tap((emailId) => messagesContainerService.markAsUnread(emailId)),
    );

    return {
      viewState: {
        selectedMessage: [messagesContainerService.selectedMessage$, null],
      },
      effects: [
        onDeleteMessageEffect$,
        onMarkAsReadEffect$,
        onMarkAsUnreadEffect$,
      ],
    };
  };
}

export const MessagesContainer = connect(
  MessagesContainerView,
  messagesContainerControllerKey,
);
