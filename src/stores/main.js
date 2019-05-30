import { writable, readable } from "svelte/store";

export const semesterConfig = readable(null, async set => {
  const response = await fetch("http://localhost:8080/semesterConfig").catch(
    error => alert("Fehler: vermutlich läuft plexams-server nicht!")
  );
  const sc = await response.json();
  set(sc);
  return () => {};
});

export const validation = writable([]);

export const fetchValidation = async () => {
  let response = await fetch("http://localhost:8080/validation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(["ValidateSchedule"])
  });
  const validationVal = await response.json();
  validation.set(validationVal);
};