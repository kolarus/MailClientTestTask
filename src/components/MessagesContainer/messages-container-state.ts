import { combineLatest, map, type Observable, shareReplay } from "rxjs";
import type {
  EmailListStateService,
  Email,
} from "../EmailList/email-list-state";

export interface MessagesContainerStateService {
  readonly selectedMessage$: Observable<Email | null>;
  readonly deleteMessage: (emailId: string) => void;
  readonly markAsRead: (emailId: string) => void;
  readonly markAsUnread: (emailId: string) => void;
}

export const createMessagesContainerStateService = (
  emailListService: EmailListStateService,
): MessagesContainerStateService => {
  const selectedMessage$ = combineLatest([
    emailListService.emails$,
    emailListService.selectedEmail$,
  ]).pipe(
    map(([emails, selectedEmailId]) => {
      if (!selectedEmailId) return null;
      return emails.find((email) => email.id === selectedEmailId) || null;
    }),
    shareReplay(1),
  );

  return {
    selectedMessage$,
    deleteMessage: (emailId: string) => {
      emailListService.deleteEmail(emailId);
    },
    markAsRead: (emailId: string) => {
      emailListService.markEmailAsRead(emailId);
    },
    markAsUnread: (emailId: string) => {
      emailListService.markEmailAsUnread(emailId);
    },
  };
};
