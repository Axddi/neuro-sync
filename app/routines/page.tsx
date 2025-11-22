"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

type Routine = {
  id: string;
  title: string;
  time?: string;
  active?: boolean;
  createdAt?: any;
};

export default function RoutinesPage() {
  const [user, setUser] = useState<any>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setRoutines([]);
      return;
    }
    const col = collection(db, "users", user.uid, "routines");
    const q = query(col, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) =>
      setRoutines(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Routine, "id">) }))
      )
    );
    return () => unsub();
  }, [user]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return alert("Sign in first");
    setLoading(true);
    try {
      await addDoc(collection(db, "users", user.uid, "routines"), {
        title,
        time,
        active: true,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setTime("");
    } catch (err) {
      console.error(err);
      alert("Failed to add routine");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Routines</h1>
        </header>

        <section className="mb-6 p-4 border rounded">
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              className="col-span-2 px-3 py-2 border rounded"
              placeholder="Routine title (e.g., Morning meds)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-3 py-2 border rounded"
            />
            <div className="sm:col-span-3 flex gap-2 mt-2">
              <button className="px-4 py-2 rounded bg-indigo-600 text-white" disabled={loading}>
                {loading ? "Adding..." : "Add Routine"}
              </button>
              <div className="text-sm text-slate-500 self-center">
                {user ? "Adding to your account" : "Sign in to save routines"}
              </div>
            </div>
          </form>
        </section>

        <section>
          {routines.length === 0 ? (
            <div className="p-6 border rounded text-slate-600">No routines yet.</div>
          ) : (
            <ul className="space-y-3">
              {routines.map((r) => (
                <li key={r.id} className="p-3 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-slate-500">{r.time || "No time set"}</div>
                  </div>
                  <div className="text-sm text-slate-500">{r.active ? "Active" : "Paused"}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
