import { writable, get } from "svelte/store";

import { semesterConfig } from "./main.js";

export const invigilations = writable(null);

export async function fetchInvigilations() {
  invigilations.set([[], []]);
  const resp = await fetch("http://localhost:8080/invigilators");
  const invigs = await resp.json();
  invigs[1] = invigs[1].sort((a, b) =>
    a.invigilatorName.localeCompare(b.invigilatorName)
  );
  invigilations.set(invigs);
}

export const refetch = writable(0);

export const slotsForDay = writable([]);
export const slotsByRooms = writable([]);

export async function fetchSlotsForDay(day) {
  slotsForDay.set([]);
  slotsByRooms.set([]);
  const resp = await fetch("http://localhost:8080/slotsForDay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(day)
  });
  const j = await resp.json();
  slotsForDay.set(j);
  let slotsByRoomsArr = [];
  const semConf = get(semesterConfig);
  for (let slot = 0; slot < semConf.slotsPerDay.length; slot++) {
    const resp = await fetch("http://localhost:8080/slotByRooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([day, slot])
    });
    const sBR = await resp.json();
    slotsByRoomsArr.push(sBR);
  }
  slotsByRooms.set(slotsByRoomsArr);
}
