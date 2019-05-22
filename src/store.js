import { writable } from "svelte/store";

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

export const refetchExams = writable([-1, -1]);
