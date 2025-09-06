export const formatEmailDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const now = new Date();

  // Get the start of today
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Get the start of yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Get the start of the email date
  const emailDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  // Format time as 12-hour format
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const timeString = timeFormatter.format(date);

  // Check if it's today
  if (emailDate.getTime() === today.getTime()) {
    return `Today ${timeString}`;
  }

  // Check if it's yesterday
  if (emailDate.getTime() === yesterday.getTime()) {
    return `Yesterday ${timeString}`;
  }

  // Check if it's within the last 7 days
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  if (date >= weekAgo) {
    const dayFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    });
    return `${dayFormatter.format(date)} ${timeString}`;
  }

  // Check if it's within the current year
  if (date.getFullYear() === now.getFullYear()) {
    const monthDayFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });
    return monthDayFormatter.format(date);
  }

  // For older dates, show month, day, and year
  const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return fullDateFormatter.format(date);
};
