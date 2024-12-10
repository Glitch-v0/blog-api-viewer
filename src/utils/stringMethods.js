export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function formatDate(isoDate) {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const suffix = (day) => {
    if (day % 10 === 1 && day !== 11) return "st";
    if (day % 10 === 2 && day !== 12) return "nd";
    if (day % 10 === 3 && day !== 13) return "rd";
    return "th";
  };

  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12; // Convert to 12-hour format

  return `${month} ${day}${suffix(
    day
  )}, ${year} ${formattedHour}:${minutes} ${ampm}`;
}
