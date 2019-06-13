import { writable } from "svelte/store";

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
