import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const convertDateAndTimeToLocal = (date: string | null | undefined) : string => {
  if (!date) return '-';
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return '-'; // Check for invalid date
  return format(parsedDate, 'dd/MM/yyyy HH:mm');
};


export const converIdAndNameToOptions = (data: { id: string; name: string }[]): { value: string; label: string }[] => {
  return data.map((item) => ({ value: item.id.toString(), label: item.name }));
}

export function arrayToString(array: any[], delimiter = ', ') {
    return Array.isArray(array) ? array.join(delimiter) : '-';
}


export function removeKeyFromObject<T extends Record<string, any>>(
  obj: T | null | undefined,
  keys: string | string[]
): T {
  // Handle null or undefined input
  if (!obj || typeof obj !== 'object') {
    return {} as T; // Return empty object as fallback
  }

  if (Array.isArray(keys)) {
    // Handle empty keys array
    if (keys.length === 0) {
      return { ...obj } as T; // Return a shallow copy of the object
    }

    return keys.reduce<T>((acc, key) => {
      // Ensure acc is a valid object before destructuring
      if (!acc || typeof acc !== 'object') {
        return {} as T; // Fallback to empty object
      }
      const { [key]: _, ...rest } = acc;
      return rest as T;
    }, obj);
  }

  // Handle single key case
  const { [keys]: _, ...rest } = obj;
  return rest as T;
}

export function formatCompactNumber(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "-";

  const abs = Math.abs(num);

  const format = (n: number, suffix: string) => {
    const rounded = Math.round(n * 100) / 100;
    const formatted = rounded.toFixed(2).replace(/\.?0+$/, ""); // trim .00 or .0
    return `${formatted} ${suffix}`;
  };

  if (abs >= 1_000_000_000_000) return format(num / 1_000_000_000_000, "T");
  if (abs >= 1_000_000_000) return format(num / 1_000_000_000, "B");
  if (abs >= 1_000_000) return format(num / 1_000_000, "M");
  if (abs >= 1_000) return format(num / 1_000, "K");

  return num.toFixed(2).replace(/\.?0+$/, "");
}



export const handleCopy = async (text: string = '') => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (error) {
    toast.error("Failed to copy");
    console.error("Clipboard copy failed:", error);
  }
};

 
export const maskString = (value: string | number = ''): string => {
  const str = value.toString();
  if (str.length <= 8) return str;
  
  const firstFour = str.slice(0, 4);
  const lastFour = str.slice(-4);
  const maskedMiddle = '*'.repeat(Math.min(str.length - 8, 3)) ;
  
  return `${firstFour}${maskedMiddle}${lastFour}`;
};

