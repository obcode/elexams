import { readable } from "svelte/store";

export const plannedRooms = readable([], async set => {
  const response = await fetch("http://localhost:8080/plannedRooms");
  const rooms = await response.json();
  set(rooms);
  return () => {};
});
