import { parse, format } from "date-fns";

const formatDate = (dateString: string) => {
  try {
    // Create a Date object directly, which is more flexible with different formats
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    // Format the date into the desired format
    return format(date, "dd/MM/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

export default formatDate;

export const formatDateForDocuments = (dateString: string): string => {
  const date = new Date(dateString);

  // Format day with ordinal suffix
  const day = date.getDate();
  const dayWithSuffix =
    day +
    ["th", "st", "nd", "rd"][
      day % 10 > 3 || Math.floor(day / 10) === 1 ? 0 : day % 10
    ];

  // Format month
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  // Format year
  const year = date.getFullYear();

  // Return formatted string
  return `Verified on ${dayWithSuffix} ${month} ${year}`;
};

