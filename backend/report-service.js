import PDFDocument from 'pdfkit';

/**
 * Generates a PDF report for a given list of logs
 * @param {Array} logs - Array of log objects { mood, notes, timestamp }
 * @param {string} patientId - The ID of the patient
 * @returns {Promise<Buffer>} - The PDF file as a buffer
 */
export async function generateWeeklyReport(patientId, logs) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    // Collect data chunks
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // --- PDF CONTENT START ---

    // 1. Header
    doc.fontSize(20).text('NeuroSync Weekly Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Patient ID: ${patientId}`);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Horizontal Line
    doc.moveDown();

    // 2. Summary Section
    doc.fontSize(16).text('Behavior Log Summary');
    doc.moveDown();

    if (!logs || logs.length === 0) {
      doc.fontSize(12).text('No logs recorded for this period.');
    } else {
      // 3. Iterate through logs
      logs.forEach((log, index) => {
        const date = log.timestamp ? new Date(log.timestamp).toLocaleString() : 'N/A';
        
        doc.fontSize(12).font('Helvetica-Bold').text(`Entry #${index + 1} - ${date}`);
        doc.fontSize(10).font('Helvetica').text(`Mood: ${log.mood}`);
        doc.text(`Notes: ${log.notes || 'No notes provided.'}`);
        doc.moveDown(0.5);
      });
    }

    // --- PDF CONTENT END ---
    
    doc.end();
  });
}