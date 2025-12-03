import { NextResponse } from "next/server";
import { generateWeeklyReport } from "@/backend/report-service";
import { adminStorage } from "@/lib/firebase-admin";
import { sendSMS } from "@/backend/notification-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, logs, contactPhone } = body; // Added contactPhone

    console.log(`Generating report for ${patientId}...`);

    // 1. Generate PDF
    const pdfBuffer = await generateWeeklyReport(patientId, logs);

    // 2. Upload to Firebase Storage
    const bucket = adminStorage.bucket();
    const filename = `reports/${patientId}/${Date.now()}-weekly.pdf`;
    const file = bucket.file(filename);

    await file.save(pdfBuffer as Buffer, {
      metadata: { contentType: 'application/pdf' },
    });

    // 3. Get Download Link (Valid for 7 days)
    const [downloadUrl] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, 
    });

    console.log("Report uploaded:", downloadUrl);

    // 4. Send SMS if phone number is provided
    let smsResult = "No phone provided";
    if (contactPhone) {
      console.log(`Sending SMS to ${contactPhone}...`);
      await sendSMS(
        contactPhone, 
        `NeuroSync Alert: Your weekly patient report is ready. Download here: ${downloadUrl}`
      );
      smsResult = "Sent";
    }

    return NextResponse.json({ 
      success: true, 
      message: "Report generated, uploaded, and sent.",
      downloadUrl,
      smsStatus: smsResult
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Report Flow Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("Report Flow Error:", String(error));
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}