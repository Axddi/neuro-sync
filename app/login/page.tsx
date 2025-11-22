"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isSignup) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) await updateProfile(userCred.user, { displayName });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err?.message || "Auth error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md border rounded-lg p-6 shadow-sm">
        <h1 className="text-xl font-semibold">{isSignup ? "Create account" : "Sign in"}</h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm">Full name</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded"
                placeholder="Name"
                required={isSignup}
              />
            </div>
          )}
          <div>
            <label className="block text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
              {loading ? "Working..." : isSignup ? "Create account" : "Sign in"}
            </button>

            <button
              type="button"
              onClick={() => setIsSignup((s) => !s)}
              className="text-sm underline"
            >
              {isSignup ? "Have an account? Sign in" : "Create an account"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
