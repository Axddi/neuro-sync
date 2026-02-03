import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateWeeklyReport } from "@/backend/report-service";
import { sendSMS } from "@/backend/notification-service";
import { getFirebaseAdmin } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const { patientId, logs } = await request.json();

    if (!patientId || !Array.isArray(logs)) {
      return NextResponse.json(
        { error: "patientId and logs are required" },
        { status: 400 }
      );
    }

    const admin = getFirebaseAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Firebase not configured" },
        { status: 503 }
      );
    }

    const bucket = admin.storage().bucket();

    const pdfBuffer = await generateWeeklyReport(patientId, logs);

    const file = bucket.file(`reports/${patientId}-${Date.now()}.pdf`);
    await file.save(pdfBuffer, { contentType: "application/pdf" });

    const [signedUrl] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60,
    });

    if (process.env.ADMIN_PHONE_NUMBER) {
      await sendSMS(
        process.env.ADMIN_PHONE_NUMBER,
        `Weekly report ready for ${patientId}: ${signedUrl}`
      );
    }

    return NextResponse.json({
      success: true,
      url: signedUrl,
    });
  } catch (error: any) {
    console.error("Report API failed:", error);
    return NextResponse.json(
      { error: error.message ?? "Report generation failed" },
      { status: 500 }
    );
  }
}
