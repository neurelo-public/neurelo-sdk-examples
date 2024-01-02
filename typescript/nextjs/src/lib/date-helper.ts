/**
 * Formats given date to US Standard Date format.
 * @param strDate: string
 * @returns string : Jan 01, 2023
 */
export const formatDate = (strDate: string) => {
  return Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(strDate));
};

/**
 * Formats given date to US Standard Time format.
 * @param date: string
 * @returns string : 12:00 AM
 */
export const formatTimeShort = (strDate: string) => {
  return Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(strDate));
};
