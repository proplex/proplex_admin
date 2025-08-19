export const formatDOB = (dob: any) => {
    const dobStr = String(dob);
    if (!dobStr || dobStr.length !== 8) return "N/A";
  
    const year = dobStr.slice(0, 4);
    const month = dobStr.slice(4, 6);
    const day = dobStr.slice(6, 8);
  
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  