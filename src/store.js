import { writable, readable } from "svelte/store";

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

export const selectedExamAnCode = writable(0);

export const clickedExamAnCode = writable(0);

export const showRegisteredGroups = writable(false);

export const semesterConfig = readable(null, async set => {
  const response = await fetch("http://localhost:8080/semesterConfig");
  const sc = await response.json();
  set(sc);
  return () => {};
});

export const selectedLecturer = writable(0);

export const lecturers = readable([], async set => {
  const response = await fetch("http://localhost:8080/lecturer");
  const lec = await response.json();
  set(lec);
  return () => {};
});
