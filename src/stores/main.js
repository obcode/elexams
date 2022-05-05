import { writable, readable } from "svelte/store";

export const semesterConfig = readable(null, (set) => {
  fetch("http://127.0.0.1:8080/semesterConfig")
    .then((response) => response.json())
    .then((sc) => set(sc))
    .catch(console.log("Fehler: vermutlich läuft plexams-server nicht!"));
  return () => {};
});

export const validation = writable([]);

export async function fetchValidation(validateWhat) {
  let response = await fetch("http://127.0.0.1:8080/validation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([validateWhat]),
  });
  const validationVal = await response.json();
  validation.set(validationVal);
}
