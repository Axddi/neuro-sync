import { NextResponse } from "next/server";
import { sendPushNotification, sendSMS } from "@/backend/notification-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, contact, title, message } = body;

    let result;
    if (type === "push") {
      result = await sendPushNotification(contact, title, message);
    } else if (type === "sms") {
      result = await sendSMS(contact, message);
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    let errMsg = "Internal Server Error";
    if (error instanceof Error) {
      errMsg = error.message;
    } else if (typeof error === "string") {
      errMsg = error;
    } else if (error && typeof (error as { message?: unknown }).message === "string") {
      errMsg = (error as { message: string }).message;
    }

    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}