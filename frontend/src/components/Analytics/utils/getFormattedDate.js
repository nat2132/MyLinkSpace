export const getFormattedDate = () => {
    const date = new Date();
    const options = { month: "short" }; // To get the month in short format like 'Mar'
    const month = date.toLocaleString("en-US", options);
    const day = date.getDate();
    const year = date.getFullYear();
  
    const getDayWithSuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`; // Special case for numbers 4-20
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };
  
    return `${month} ${getDayWithSuffix(day)}, ${year}`;
  };