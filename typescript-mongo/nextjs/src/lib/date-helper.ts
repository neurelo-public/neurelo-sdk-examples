
function isValidInteger(value: string): boolean {
  return !Number.isNaN(Number(value)) && Number(value) >= 0;
}
/**
 * Formats given date to US Standard Date format.
 * @param strDate: string
 * @returns string : Jan 01, 2023
 */
export const formatDate = (strDate: string) => {
  try {
    let dateToUse: string | number = strDate;

    if (isValidInteger(strDate)) {
      dateToUse = new Date().setUTCMilliseconds(Number(strDate));
    }

    return Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateToUse));
  } catch (error) {
    console.error('Error formatting date : ', error);
    return strDate;
  }
};

/**
 * Formats given date to US Standard Time format.
 * @param date: string
 * @returns string : 12:00 AM
 */
export const formatTimeShort = (strDate: string) => {
  try {
    let dateToUse: string | number = strDate;

    if (isValidInteger(strDate)) {
      dateToUse = new Date().setUTCMilliseconds(Number(strDate));
    }

    return Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(dateToUse));
  } catch (error) {
    console.error('Error formatting time : ', error);
    return strDate;
  }
};
