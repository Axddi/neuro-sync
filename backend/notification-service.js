import "server-only";
import twilio from "twilio";
import { getFirebaseAdmin } from "@/lib/firebase-admin";


function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;

  if (!sid || !token) {
    console.warn("Twilio not configured");
    return null;
  }

  return twilio(sid, token);
}


export async function sendPushNotification(deviceToken, title, body) {
  if (!deviceToken) return;

  const admin = getFirebaseAdmin();
  if (!admin) {
    console.warn("Firebase Admin unavailable — push skipped");
    return { success: false };
  }

  try {
    const response = await admin.messaging().send({
      token: deviceToken,
      notification: { title, body },
    });

    console.log("Push sent:", response);
    return { success: true, id: response };
  } catch (error) {
    console.error("Push failed:", error);
    return { success: false, error: error.message };
  }
}


export async function sendSMS(toPhoneNumber, messageBody) {
  if (!toPhoneNumber) return;

  const client = getTwilioClient();
  if (!client) {
    console.warn("Twilio unavailable — SMS skipped");
    return { success: false };
  }

  try {
    const message = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toPhoneNumber,
    });

    console.log("SMS sent:", message.sid);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error("SMS failed:", error);
    return { success: false, error: error.message };
  }
}
