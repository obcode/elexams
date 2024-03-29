import { readable, writable } from "svelte/store";

export const showExams = writable(true);

export const selectedRoom = writable("alle");

export const plannedRooms = readable([], (set) => {
  fetch("http://127.0.0.1:8080/plannedRooms")
    .then((response) => response.json())
    .then((rooms) =>
      set(rooms.filter((r) => r.plannedRoomDaysAndSlots.length > 0))
    );
  return () => {};
});
