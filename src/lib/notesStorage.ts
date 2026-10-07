import { SubjectNote } from "./types";

const NOTES_STORAGE_KEY = "bcs_subject_notes_v1";

/**
 * Retrieve all notes across all subjects from local storage
 */
export function getAllNotesLocal(): SubjectNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: SubjectNote[] = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Failed to load local notes:", err);
    return [];
  }
}

/**
 * Retrieve notes for a specific subject, strictly sorted by page number in ascending order
 */
export function getNotesForSubject(subjectId: string): SubjectNote[] {
  const all = getAllNotesLocal();
  return all
    .filter((n) => n.subjectId === subjectId)
    .sort((a, b) => a.pageNumber - b.pageNumber || a.createdAt - b.createdAt);
}

/**
 * Save a note: immediately updates local storage and attempts background sync with Neon / Upstash
 */
export async function saveSubjectNote(note: SubjectNote): Promise<SubjectNote[]> {
  if (typeof window === "undefined") return [];
  
  const all = getAllNotesLocal();
  const existingIndex = all.findIndex((n) => n.id === note.id);
  let updated: SubjectNote[];

  if (existingIndex >= 0) {
    updated = [...all];
    updated[existingIndex] = note;
  } else {
    updated = [...all, note];
  }

  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updated));

  // Trigger background sync to Neon / Upstash API
  try {
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }).catch(() => {
      // Offline or network error - local storage remains safe
    });
  } catch {
    // Graceful offline fallback
  }

  return updated
    .filter((n) => n.subjectId === note.subjectId)
    .sort((a, b) => a.pageNumber - b.pageNumber || a.createdAt - b.createdAt);
}

/**
 * Delete a note from local storage and trigger deletion on server
 */
export async function deleteSubjectNote(id: string, subjectId: string): Promise<SubjectNote[]> {
  if (typeof window === "undefined") return [];

  const all = getAllNotesLocal();
  const updated = all.filter((n) => n.id !== id);
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updated));

  // Trigger background delete
  try {
    fetch(`/api/notes?id=${encodeURIComponent(id)}&subjectId=${encodeURIComponent(subjectId)}`, {
      method: "DELETE",
    }).catch(() => {
      // Offline fallback
    });
  } catch {
    // Graceful fallback
  }

  return updated
    .filter((n) => n.subjectId === subjectId)
    .sort((a, b) => a.pageNumber - b.pageNumber || a.createdAt - b.createdAt);
}

/**
 * Sync local notes with Neon / Upstash database when online
 */
export async function syncNotesWithServer(subjectId?: string): Promise<SubjectNote[]> {
  if (typeof window === "undefined") return [];

  const localNotes = getAllNotesLocal();

  try {
    const url = subjectId ? `/api/notes?subjectId=${encodeURIComponent(subjectId)}` : "/api/notes";
    const res = await fetch(url);
    if (!res.ok) return getNotesForSubject(subjectId || "");

    const data = await res.json();
    if (data.configured && Array.isArray(data.notes)) {
      const serverNotes: SubjectNote[] = data.notes;
      
      // Merge: server notes + any local notes not yet in server
      const serverMap = new Map(serverNotes.map((n) => [n.id, n]));
      for (const loc of localNotes) {
        if (!serverMap.has(loc.id)) {
          serverMap.set(loc.id, loc);
          // Upload local-only note to server
          fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loc),
          }).catch(() => {});
        }
      }

      const merged = Array.from(serverMap.values());
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(merged));

      if (subjectId) {
        return merged
          .filter((n) => n.subjectId === subjectId)
          .sort((a, b) => a.pageNumber - b.pageNumber || a.createdAt - b.createdAt);
      }
      return merged;
    }
  } catch (err) {
    console.warn("Server sync skipped, using local storage:", err);
  }

  return subjectId ? getNotesForSubject(subjectId) : localNotes;
}
