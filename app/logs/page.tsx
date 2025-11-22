"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

type Log = {
  id: string;
  mood: string;
  notes?: string;
  createdAt?: any;
  createdBy?: string;
};

export default function LogsPage() {
  const [user, setUser] = useState<any>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [mood, setMood] = useState("neutral");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) { setLogs([]); return; }
    const col = collection(db, "users", user.uid, "logs");
    const q = query(col, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) =>
      setLogs(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })))
    );
    return () => unsub();
  }, [user]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return alert("Sign in first");
    setSaving(true);
    try {
      await addDoc(collection(db, "users", user.uid, "logs"), {
        mood,
        notes,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      });
      setNotes("");
      setMood("neutral");
    } catch (err) {
      console.error(err);
      alert("Failed to create log");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-xl font-semibold">Behavior Logs</h1>
          <p className="text-sm text-slate-500">Quickly note mood or events — useful for caregivers.</p>
        </header>

        <section className="mb-6 p-4 border rounded">
          <form onSubmit={handleAdd} className="space-y-3">
            <label className="block text-sm">Mood</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)} className="px-3 py-2 border rounded">
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="anxious">Anxious</option>
              <option value="agitated">Agitated</option>
              <option value="sad">Sad</option>
            </select>

            <div>
              <label className="block text-sm">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1 w-full px-3 py-2 border rounded"
                placeholder="Short note about what happened..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded bg-indigo-600 text-white" disabled={saving}>
                {saving ? "Saving..." : "Add Log"}
              </button>
              <div className="text-sm text-slate-500">{user ? "Saved to your account" : "Sign in to save logs"}</div>
            </div>
          </form>
        </section>

        <section>
          {logs.length === 0 ? (
            <div className="p-6 border rounded text-slate-600">No recent logs.</div>
          ) : (
            <ul className="space-y-3">
              {logs.map((l) => (
                <li key={l.id} className="p-3 border rounded">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium capitalize">{l.mood}</div>
                      <div className="text-sm text-slate-500">{l.notes}</div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {l.createdAt?.toDate ? l.createdAt.toDate().toLocaleString() : ""}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
