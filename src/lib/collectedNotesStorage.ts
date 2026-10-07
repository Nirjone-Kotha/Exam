import { CollectedNote } from "./types";

const COLLECTED_NOTES_STORAGE_KEY = "bcs_collected_notes_v1";

/**
 * Retrieve all collected notes across all subjects from local storage
 */
export function getAllCollectedNotesLocal(): CollectedNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COLLECTED_NOTES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: CollectedNote[] = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Failed to load local collected notes:", err);
    return [];
  }
}

/**
 * Retrieve collected notes for a specific subject, ordered by creation time
 */
export function getCollectedNotesForSubject(subjectId: string): CollectedNote[] {
  const all = getAllCollectedNotesLocal();
  return all
    .filter((n) => n.subjectId === subjectId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Save a collected note: updates local storage and attempts background sync with server
 */
export async function saveCollectedNote(note: CollectedNote): Promise<CollectedNote[]> {
  if (typeof window === "undefined") return [];

  const all = getAllCollectedNotesLocal();
  const existingIndex = all.findIndex((n) => n.id === note.id);
  let updated: CollectedNote[];

  if (existingIndex >= 0) {
    updated = [...all];
    updated[existingIndex] = note;
  } else {
    updated = [note, ...all];
  }

  localStorage.setItem(COLLECTED_NOTES_STORAGE_KEY, JSON.stringify(updated));

  // Trigger background sync to Neon / Upstash API
  try {
    fetch("/api/collected-notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }).catch(() => {
      // Offline fallback
    });
  } catch {
    // Graceful offline fallback
  }

  return updated
    .filter((n) => n.subjectId === note.subjectId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Delete a collected note from local storage and trigger deletion on server
 */
export async function deleteCollectedNote(id: string, subjectId: string): Promise<CollectedNote[]> {
  if (typeof window === "undefined") return [];

  const all = getAllCollectedNotesLocal();
  const updated = all.filter((n) => n.id !== id);
  localStorage.setItem(COLLECTED_NOTES_STORAGE_KEY, JSON.stringify(updated));

  // Trigger background delete
  try {
    fetch(`/api/collected-notes?id=${encodeURIComponent(id)}&subjectId=${encodeURIComponent(subjectId)}`, {
      method: "DELETE",
    }).catch(() => {
      // Offline fallback
    });
  } catch {
    // Graceful fallback
  }

  return updated
    .filter((n) => n.subjectId === subjectId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Sync local collected notes with Neon / Upstash database when online
 */
export async function syncCollectedNotesWithServer(subjectId?: string): Promise<CollectedNote[]> {
  if (typeof window === "undefined") return [];

  const localNotes = getAllCollectedNotesLocal();

  try {
    const url = subjectId ? `/api/collected-notes?subjectId=${encodeURIComponent(subjectId)}` : "/api/collected-notes";
    const res = await fetch(url);
    if (!res.ok) return getCollectedNotesForSubject(subjectId || "");

    const data = await res.json();
    if (data.configured && Array.isArray(data.notes)) {
      const serverNotes: CollectedNote[] = data.notes;

      // Merge: server notes + any local notes not yet in server
      const serverMap = new Map(serverNotes.map((n) => [n.id, n]));
      for (const loc of localNotes) {
        if (!serverMap.has(loc.id)) {
          serverMap.set(loc.id, loc);
          // Upload local-only note to server
          fetch("/api/collected-notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loc),
          }).catch(() => {});
        }
      }

      const merged = Array.from(serverMap.values());
      localStorage.setItem(COLLECTED_NOTES_STORAGE_KEY, JSON.stringify(merged));

      if (subjectId) {
        return merged
          .filter((n) => n.subjectId === subjectId)
          .sort((a, b) => b.createdAt - a.createdAt);
      }
      return merged;
    }
  } catch (err) {
    console.warn("Server sync skipped, using local storage:", err);
  }

  return subjectId ? getCollectedNotesForSubject(subjectId) : localNotes;
}
