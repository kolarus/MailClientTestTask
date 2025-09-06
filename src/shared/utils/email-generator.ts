import type { Email } from "@/components/EmailList/email-list-state";

export interface EmailGeneratorOptions {
  folderId: string;
  from?: string;
  subject?: string;
  content?: string;
}

export const generateEmail = (options: EmailGeneratorOptions): Email => {
  const now = new Date();
  const timestamp = now.toISOString();

  const id = `${timestamp}-${Math.random().toString(36).substring(2, 9)}`;

  return {
    id,
    from: options.from || "Generated Email",
    subject: options.subject || `New Email - ${now.toLocaleDateString()}`,
    content:
      options.content ||
      `This is a generated email created at ${now.toLocaleString()}. It was automatically added to the ${options.folderId} folder.`,
    date: timestamp,
    folderId: options.folderId,
    isRead: false,
    isDeleted: false,
  };
};
