export const formatTime = (date: string): string => {
    const dateObj = new Date(date); // Convert string to Date object
    // Check if the date is valid
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Valid options: "long", "short", "narrow"
        month: 'long',   // Valid options: "long", "short", "narrow"
        day: '2-digit',  // Valid options: "2-digit", "numeric"
        year: 'numeric', // Valid options: "2-digit", "numeric"
    };
    // Format the date using 'en-IN' locale (Indian English)
    return dateObj.toLocaleDateString('en-IN', options);
};

export function moneyFormat(price:any, localeType = 'en-IN'){
    if (price === undefined) price = 0;

    let locale = Intl.NumberFormat(localeType, {
        style: "currency",
        currency: "INR",
    });
    return locale.format(price)
}


export const formatDateEmp = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2); // Format day as dd
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Format month as mm
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};
  
export const formatDatetime = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2); // Format day as dd
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Format month as mm
    const year = d.getFullYear();
    const hours = ("0" + d.getHours()).slice(-2); // Format hours as hh
    const minutes = ("0" + d.getMinutes()).slice(-2); // Format minutes as mm
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}