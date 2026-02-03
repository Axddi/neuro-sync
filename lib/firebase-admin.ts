import "server-only";
import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!key) throw new Error(" FIREBASE_SERVICE_ACCOUNT_KEY is missing");

    let serviceAccount;
    try {
      serviceAccount = JSON.parse(key);
    } catch (_parseError: unknown) {
      console.error(" Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", _parseError);
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON.");
    }

    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // ADD THIS LINE:
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, 
    });

    console.log(" Firebase Admin Initialized");

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("FIREBASE INIT ERROR:", error.message);
    } else {
      console.error("FIREBASE INIT ERROR:", String(error));
    }
  }
}

export const adminMessaging = admin.messaging();
// ADD THIS EXPORT:
export const adminStorage = admin.storage();