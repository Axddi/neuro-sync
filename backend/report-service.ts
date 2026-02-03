import PDFDocument from "pdfkit";

export async function generateWeeklyReport(
  patientId: string,
  logs: Array<{
    mood?: string;
    notes?: string;
    timestamp?: number;
  }>
): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.fontSize(20).text("NeuroSync Weekly Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Patient ID: ${patientId}`);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    if (!logs.length) {
      doc.text("No logs recorded for this period.");
    } else {
      logs.forEach((log, i) => {
        doc.text(`Entry #${i + 1}`);
        doc.text(`Mood: ${log.mood ?? "N/A"}`);
        doc.text(`Notes: ${log.notes ?? "None"}`);
        doc.moveDown();
      });
    }

    doc.end();
  });
}
