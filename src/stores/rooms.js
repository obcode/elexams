import { readable, writable } from "svelte/store";

export const showExams = writable(true);

export const selectedRoom = writable("alle");

export const plannedRooms = readable([], async set => {
  const response = await fetch("http://localhost:8080/plannedRooms");
  const rooms = await response.json();
  set(rooms.filter(r => r.plannedRoomDaysAndSlots.length > 0));
  return () => {};
});
