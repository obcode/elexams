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

export const conflictingAncodes = writable(0);

export const conflictingSlots = writable([]);

export const resetConflicting = writable(0);

export const setConflictingSlots = async ancode => {
  let response = await fetch("http://localhost:8080/conflictingSlots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ancode)
  });
  const resp = await response.json();
  conflictingSlots.set(resp);
};

export const clickedExamAnCode = writable(0);
