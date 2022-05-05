import { writable, readable } from "svelte/store";

export const allAncodes = readable([], (set) => {
  fetch("http://127.0.0.1:8080/exams")
    .then((response) => response.json())
    .then((exams) => set(exams.map((e) => e.anCode).sort()));
  return () => {};
});

export const refetchExams = writable([-1, -1]);

export const refetchUnscheduled = writable(0);

export const conflictingAncodes = writable(0);

export const conflictingSlots = writable([]);

export const resetConflicting = writable(0);

export const setConflictingSlots = async (ancode) => {
  let response = await fetch("http://127.0.0.1:8080/conflictingSlots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ancode),
  });
  const resp = await response.json();
  conflictingSlots.set(resp);
};

export const selectedExamAnCode = writable(0);

export const clickedExamAnCode = writable(0);

export const examsInSameSlot = writable([]);

export const showRegisteredGroups = writable(true);

export const showRooms = writable(false);

export const resetAll = () => {
  selectedExamAnCode.set(0);
  clickedExamAnCode.set(0);
  examsInSameSlot.set([]);
  conflictingAncodes.set(0);
  conflictingSlots.set([]);
  resetConflicting.set(0);
  refetchUnscheduled.update((i) => i + 1);
  refetchExams.set([]);
};
