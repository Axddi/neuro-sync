import { adminMessaging } from "@/lib/firebase-admin";
import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send Push Notification (FCM)
export async function sendPushNotification(deviceToken, title, body) {
  if (!deviceToken) return;
  try {
    const response = await adminMessaging.send({
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

// Send SMS (Twilio)
export async function sendSMS(toPhoneNumber, messageBody) {
  if (!toPhoneNumber) return;
  try {
    const message = await twilioClient.messages.create({
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