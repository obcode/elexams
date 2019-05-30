import { writable, readable } from "svelte/store";

export const selectedLecturer = writable(0);

export const lecturers = readable([], async set => {
  const response = await fetch("http://localhost:8080/lecturer");
  const lec = await response.json();
  set(lec);
  return () => {};
});
