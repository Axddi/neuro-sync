"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 p-6">
      <header className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold">NeuroSync</h1>
        <div className="flex items-center gap-3">
          <Link href="/routines" className="px-3 py-2 rounded-md bg-slate-100">Routines</Link>
          <Link href="/logs" className="px-3 py-2 rounded-md bg-slate-100">Logs</Link>
          <Link href="/login" className="px-3 py-2 rounded-md bg-slate-100">Account</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto mt-8 grid gap-6">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-lg font-medium">Welcome{user ? `, ${user.displayName || user.email}` : ""}!</h2>
          <p className="mt-2 text-sm text-slate-600">
            NeuroSync is a care coordination prototype — quick links below to start creating routines
            and logging behavior.
          </p>

          <div className="mt-4 flex gap-3">
            <Link href="/routines" className="px-4 py-2 rounded-md bg-indigo-600 text-white">Open Routines</Link>
            <Link href="/logs" className="px-4 py-2 rounded-md border">Open Logs</Link>
            {user && (
              <button
                onClick={() => signOut(auth)}
                className="px-4 py-2 rounded-md border text-sm"
              >
                Sign out
              </button>
            )}
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-medium">Project plan</h3>
          <p className="mt-2 text-sm text-slate-600">
             Your design / planner is available locally for reference: 
                <code>/mnt/data/NeuroSync initial planner.pdf</code>.
          </p>

        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-medium">Next steps</h3>
          <ul className="mt-2 list-disc list-inside text-sm text-slate-600">
            <li>Complete role-based security rules in Firestore.</li>
            <li>Add FCM reminders and background scheduling (Phase 2).</li>
            <li>Design low-stimulus UI variations (toggle in layout).</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
