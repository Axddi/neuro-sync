import "server-only";
import admin from "firebase-admin";

let cachedAdmin: typeof admin | null = null;

export function getFirebaseAdmin() {

  if (cachedAdmin) return cachedAdmin;

  const serviceKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceKey) {
    console.warn(
      "Firebase Admin skipped: FIREBASE_SERVICE_ACCOUNT_KEY not set"
    );
    return null;
  }

  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(
            Buffer.from(serviceKey, "base64").toString("utf-8")
          )
        ),
      });
    }

    cachedAdmin = admin;
    return cachedAdmin;
  } catch (err) {
    console.error("Firebase Admin init failed:", err);
    return null;
  }
}
