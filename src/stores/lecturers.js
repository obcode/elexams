import { writable, readable } from "svelte/store";

export const selectedLecturer = writable(0);

export const lecturers = readable([], (set) => {
  fetch("http://127.0.0.1:8080/lecturer")
    .then((response) => response.json())
    .then((lec) => set(lec));
  return () => {};
});
