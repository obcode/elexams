import { writable, readable } from "svelte/store";

export const allAncodes = readable([], set => {
  fetch("http://localhost:8080/exams")
    .then(response => {
      return response.json();
    })
    .then(exams => {
      return set(exams.map(e => e.anCode).sort());
    });
  return () => {};
});

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

export const examsInSameSlot = writable([]);

export const showRegisteredGroups = writable(false);

export const showRooms = writable(false);
