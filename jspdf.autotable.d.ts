import jsPDF from "jsPDF";
import autoTable from "jspdf-autotable";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface GeneratePDFProps {
  fromName: string;
  invoiceNumber: string;
  fromEmail: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  clientAddress: string;
  currency: string;
  taxRate: number;
  fromAddress: string;
  vatReg: string;
  fromPhone: string;
  notes: string;
  items: InvoiceItem[];
  logoSrc?: string;
}

// Helper to convert an image URL into a base64 string so jsPDF can embed it
const getBase64ImageFromURL = async (url: string): Promise<string | null> => {
  try {
    const res: Response = await fetch(url);
    const blob: Blob = await res.blob();
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = (): void => resolve(reader.result as string);
      reader.onerror = (): void => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

export async function generateInvoicePDF({
  fromName,
  invoiceNumber,
  fromEmail,
  issueDate,
  dueDate,
  clientName,
  clientAddress,
  currency,
  taxRate,
  fromAddress,
  vatReg,
  fromPhone,
  notes,
  items,
  logoSrc = "/favicon.ico",
}: GeneratePDFProps): Promise<void> {
  // Initialize the PDF document in portrait A4 size
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  doc.setFont("helvetica");

  // Load and add the company logo if available
  const base64Logo: string | null = await getBase64ImageFromURL(logoSrc);
  if (base64Logo) {
    try {
      doc.addImage(base64Logo, "PNG", 14, 12, 16, 16);
    } catch {
      // Fallback if image format fails
    }
  }

  const textStartX: number = base64Logo ? 34 : 14;

  // Draw business name and invoice header details
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(fromName || "Business Name", textStartX, 20);

  doc.setFontSize(20);
  doc.text("INVOICE", 196, 20, { align: "right" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`# ${invoiceNumber}`, 196, 26, { align: "right" });
  doc.text(`Date: ${issueDate}`, 196, 32, { align: "right" });
  if (dueDate) {
    doc.text(`Due: ${dueDate}`, 196, 38, { align: "right" });
  }

  // Draw a horizontal divider line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(14, 44, 196, 44);

  // Draw a background box for sender and client info
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(14, 48, 182, 32, 3, 3, "FD");

  // Add Sender ("From") info on the left
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text("FROM", 18, 55);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(17, 24, 39);
  if (fromEmail) {
    doc.text(fromEmail, 18, 61);
  }
  if (fromPhone) {
    doc.text(`Phone: ${fromPhone}`, 18, 67);
  }
  if (vatReg) {
    doc.text(`VAT Reg: ${vatReg}`, 18, 73);
  }

  // Add Client ("Billed To") info on the right
  doc.setFont("helvetica", "bold");
  doc.setTextColor(107, 114, 128);
  doc.text("BILLED TO", 110, 55);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(17, 24, 39);
  doc.text(clientName || "Client Name", 110, 61);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(55, 65, 81);
  const splitClientAddress: string[] = doc.splitTextToSize(clientAddress || "", 80);
  doc.text(splitClientAddress, 110, 67);

  // Calculate subtotal and tax amounts
  const subtotal: number = items.reduce((acc: number, item: InvoiceItem) => acc + item.quantity * item.price, 0);
  const taxAmount: number = (subtotal * (taxRate || 0)) / 100;

  // Format table rows for items
  const tableRows: (string | number)[][] = items.map((item: InvoiceItem) => [
    item.description || "—",
    item.quantity,
    `${currency} ${Number(item.price).toFixed(2)}`,
    `${currency} ${(item.quantity * item.price).toFixed(2)}`,
  ]);

  const headFillColor: [number, number, number] = [243, 244, 246];
  const headTextColor: [number, number, number] = [17, 24, 39];
  const bodyTextColor: [number, number, number] = [55, 65, 81];

  // Generate the line items table using autoTable
  autoTable(doc, {
    startY: 86,
    head: [["Description", "Qty", "Unit Price", "Total"]],
    body: tableRows,
    theme: "striped",
    headStyles: {
      fillColor: headFillColor as unknown as string,
      textColor: headTextColor as unknown as string,
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: bodyTextColor as unknown as string,
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 20, halign: "center" },
      2: { cellWidth: 35, halign: "right" },
      3: { cellWidth: 35, halign: "right" },
    },
    margin: { left: 14, right: 14 },
  });

  // Calculate totals block position based on table height
  const typedDoc = doc as jsPDF & { lastAutoTable: { finalY: number } };
  const finalY: number = typedDoc.lastAutoTable.finalY + 6;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 85, 99);

  const summaryXLabel: number = 135;
  const summaryXVal: number = 196;

  // Render Subtotal
  doc.text("Subtotal:", summaryXLabel, finalY);
  doc.text(`${currency} ${subtotal.toFixed(2)}`, summaryXVal, finalY, { align: "right" });

  let nextY: number = finalY + 6;
  if (taxRate > 0) {
    doc.text(`VAT (${taxRate}%):`, summaryXLabel, nextY);
    doc.text(`${currency} ${taxAmount.toFixed(2)}`, summaryXVal, nextY, { align: "right" });
    nextY += 6;
  }

  // Draw separator line above final total
  doc.setDrawColor(209, 213, 219);
  doc.line(summaryXLabel, nextY - 4, summaryXVal, nextY - 4);

  // Render Grand Total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text("Total:", summaryXLabel, nextY);
  doc.text(`${currency} ${(subtotal + taxAmount).toFixed(2)}`, summaryXVal, nextY, { align: "right" });

  // Render notes section if notes are provided
  if (notes) {
    const notesY: number = Math.max(nextY + 12, finalY + 20);
    doc.setDrawColor(229, 231, 235);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(14, notesY - 4, 196, notesY - 4);
    doc.setLineDashPattern([], 0);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("Notes:", 14, notesY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    const splitNotes: string[] = doc.splitTextToSize(notes, 180);
    doc.text(splitNotes, 14, notesY + 5);
  }

  // Trigger browser download of the PDF file
  doc.save(`Invoice_${invoiceNumber}.pdf`);
}