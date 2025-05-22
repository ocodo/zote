export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if needed

  return `${formattedHours}:${formattedMinutes}${period}`;
}

export function getCurrentDay() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const dayIndex = now.getDay(); // Returns a number between 0 (Sunday) and 6 (Saturday)

  return days[dayIndex];
}
