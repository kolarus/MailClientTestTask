import { useEffect, useRef } from "react";
import type { Email } from "../email-list-state";

interface UseKeyboardNavigationProps {
  emails: readonly Email[];
  selectedEmail: string;
  onSelectEmail: (id: string) => void;
  onDeleteEmail: (id: string) => void;
}

export const useKeyboardNavigation = ({
  emails,
  selectedEmail,
  onSelectEmail,
  onDeleteEmail,
}: UseKeyboardNavigationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          navigateUp();
          break;
        case "ArrowDown":
          event.preventDefault();
          navigateDown();
          break;
        case "Backspace":
          event.preventDefault();
          deleteSelected();
          break;
      }
    };

    // potential improvement: to avoid "spilling" the logic from controller into a hook,
    // if logic here becomes more complex, it should be moved to the controller
    // i am just tired and think that for test task it is not a big deal 😉, it is optional task anyways
    const navigateUp = () => {
      if (emails.length === 0) return;

      const currentIndex = emails.findIndex(
        (email) => email.id === selectedEmail,
      );
      if (currentIndex > 0) {
        onSelectEmail(emails[currentIndex - 1].id);
      } else if (currentIndex === -1 && emails.length > 0) {
        onSelectEmail(emails[emails.length - 1].id);
      }
    };

    const navigateDown = () => {
      if (emails.length === 0) return;

      const currentIndex = emails.findIndex(
        (email) => email.id === selectedEmail,
      );
      if (currentIndex < emails.length - 1) {
        onSelectEmail(emails[currentIndex + 1].id);
      } else if (currentIndex === -1 && emails.length > 0) {
        onSelectEmail(emails[0].id);
      }
    };

    const deleteSelected = () => {
      if (selectedEmail) {
        onDeleteEmail(selectedEmail);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [emails, selectedEmail, onSelectEmail, onDeleteEmail]);

  useEffect(() => {
    if (containerRef.current && emails.length > 0) {
      containerRef.current.focus();
    }
  }, [emails.length]);

  return containerRef;
};
