import { connect, type Controller } from "jet-blaze/connector";
import { EmailListView, type ViewProps } from "./EmailListView.tsx";
import { emailListControllerKey } from "./email-list-controller-key.ts";
import type { EmailListStateService } from "./email-list-state.ts";
import type { MainSidebarStateService } from "../MainSidebar/main-sidebar-state.ts";
import { tap, distinctUntilChanged, filter, withLatestFrom } from "rxjs";
import { generateEmail } from "@/shared/utils/email-generator";

export interface Props {}

export function createEmailListController(
  emailListService: EmailListStateService,
  sidebarService: MainSidebarStateService,
): Controller<Props, ViewProps> {
  return ({
    onSelectedEmailChange$,
    onMarkAsRead$,
    onMarkAsUnread$,
    onDelete$,
    onAddEmail$,
  }) => {
    const onSelectedEmailChangeEffect$ = onSelectedEmailChange$.pipe(
      tap((emailId) => emailListService.selectEmail(emailId)),
    );

    const onMarkAsReadEffect$ = onMarkAsRead$.pipe(
      tap((emailId) => emailListService.markEmailAsRead(emailId)),
    );

    const onMarkAsUnreadEffect$ = onMarkAsUnread$.pipe(
      tap((emailId) => emailListService.markEmailAsUnread(emailId)),
    );

    const onDeleteEffect$ = onDelete$.pipe(
      tap((emailId) => emailListService.deleteEmail(emailId)),
    );

    const onAddEmailEffect$ = onAddEmail$.pipe(
      withLatestFrom(sidebarService.selectedFolder$),
      filter(([, selectedFolder]) => selectedFolder !== ""),
      tap(([, selectedFolder]) => {
        const newEmail = generateEmail({ folderId: selectedFolder });
        emailListService.addEmail(newEmail);
      }),
    );

    const onFolderChangeEffect$ = sidebarService.selectedFolder$.pipe(
      distinctUntilChanged(),
      filter((folderId) => folderId !== ""),
      tap(() => {
        emailListService.clearSelectedEmail();
      }),
    );

    return {
      viewState: {
        emails: [emailListService.emails$, []],
        selectedEmail: [emailListService.selectedEmail$, ""],
        isLoading: [emailListService.isLoading$, false],
        error: [emailListService.error$, null],
        selectedFolder: [sidebarService.selectedFolder$, ""],
      },
      effects: [
        onSelectedEmailChangeEffect$,
        onMarkAsReadEffect$,
        onMarkAsUnreadEffect$,
        onDeleteEffect$,
        onAddEmailEffect$,
        onFolderChangeEffect$,
      ],
    };
  };
}

export const EmailList = connect(EmailListView, emailListControllerKey);
