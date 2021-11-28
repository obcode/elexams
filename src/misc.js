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

export function weekend(date, examsOnSaturdays) {
  const d = new Date(date);
  console.log(examsOnSaturdays)
  return d.getDay() === (examsOnSaturdays ? 6 : 5);
}

export function isWeekend(date, examsOnSaturdays) {
  const d = new Date(date);
  console.log(examsOnSaturdays)
  if (d.getDay() === 6 || d.getDay() === 7)
    return "isWeekend"
  else return ""
}