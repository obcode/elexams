export function dateString(date) {
  const d = new Date(date);
  const options = {
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  };
  return d.toLocaleString("de-DE", options);
}

export function weekend(date) {
  const d = new Date(date);
  return d.getDay() === 5;
}
