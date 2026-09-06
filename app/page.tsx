"use client";

import ThemeToggle from "@/components/theme-toggle";
import InvoicePreview from "@/components/invoice-preview";
import { generateInvoicePDF, InvoiceItem, GeneratePDFProps } from "@/lib/generate-invoice-pdf";
import { Play, X, Trash2, Plus, Download } from "lucide-react";
import Image from "next/image";
import { useState, ChangeEvent } from "react";

export default function Home() {
  // Toggle for mobile preview modal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Form state variables for invoice details
  const [fromName, setFromName] = useState<string>("STORM RIM INVESTMENT CC");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("53897658");
  const [fromEmail, setFromEmail] = useState<string>("rimai0264@gmail.com");
  const [issueDate, setIssueDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [clientName, setClientName] = useState<string>("EASY FARMING INVESTMENT");
  const [dueDate, setDueDate] = useState<string>("");
  const [currency, setCurrency] = useState<string>("N$");
  const [taxRate, setTaxRate] = useState<number>(0);
  const [fromAddress, setFromAddress] = useState<string>("P. O Box 24613\nWINDHOEK\nNAMIBIA");
  const [clientAddress, setClientAddress] = useState<string>("P. O Box 524\nOtjiwarongo\nNamibia");
  const [vatReg, setVatReg] = useState<string>("CC/2017/10903");
  const [fromPhone, setFromPhone] = useState<string>("+264 81 2911 535");
  const [notes, setNotes] = useState<string>("Transport of goods and related services.");
  const [formError, setFormError] = useState<string>("");

  const logoSrc = "/favicon.ico";

  // State to manage list items on the invoice
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Transport of goods", quantity: 1, price: 0 },
  ]);

  // Adds a new blank line item row
  const addItem = (): void => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: "", quantity: 1, price: 0 },
    ]);
  };

  // Removes a line item row (keeps at least one)
  const removeItem = (id: string): void => {
    if (items.length === 1) return;
    setItems(items.filter((item: InvoiceItem) => item.id !== id));
  };

  // Updates a specific property of a specific line item
  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number): void => {
    setItems(
      items.map((item: InvoiceItem) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Validates inputs, creates the PDF, and auto-increments the invoice number
  const handleDownloadPDF = async (): Promise<void> => {
    if (!fromName || !clientName || !invoiceNumber) {
      setFormError("Please fill in all required fields (Business Name, Client Name, Invoice #).");
      return;
    }
    setFormError("");

    await generateInvoicePDF({
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
      logoSrc,
    });

    // Automatically increment the invoice number after successful download
    const parsedNumber = parseInt(invoiceNumber, 10);
    if (!isNaN(parsedNumber)) {
      const incremented = parsedNumber + 1;
      const originalLength = invoiceNumber.length;
      const newInvoiceStr = incremented.toString();
      
      if (invoiceNumber.startsWith("0") && newInvoiceStr.length < originalLength) {
        setInvoiceNumber(newInvoiceStr.padStart(originalLength, "0"));
      } else {
        setInvoiceNumber(newInvoiceStr);
      }
    }
  };

  // Bundle properties together to pass into the preview component
  const previewProps: GeneratePDFProps = {
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
    logoSrc,
  };

  return (
    <div className="min-h-screen relative gap-2 py-3 px-5 md:px-15 lg:px-25 flex flex-col bg-background text-foreground">
      {/* App Header with Logo and Theme Toggle */}
      <div className="h-20 flex justify-between items-center">
        <div className="flex items-center gap-3 max-w-4xl">
          <div className="p-2 bg-card rounded-2xl border border-border">
            <Image 
              src={logoSrc} 
              alt="Logo"
              width={50}
              height={50}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">STOMRIM Invoice App</h1>
            <p className="text-muted-foreground text-sm">
              Generate clean, tax-compliant invoices instantly
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-5">
        {/* Main Input Form Panel */}
        <main className="overflow-y-auto relative flex-1 px-5 py-5 lg:py-6 rounded-2xl border-2 border-border bg-card flex flex-col shadow-md">
          <div className="flex justify-between items-center h-15 gap-3">
            <div>
              <h2 className="text-2xl font-bold">Invoice Details</h2>
              <p className="text-muted-foreground text-sm">
                Configure your entity details, client info, items, and billing notes.
              </p>
            </div>

            {/* Mobile preview toggle button */}
            <button 
              onClick={() => setIsOpen(true)}
              className="bg-primary text-primary-foreground flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-90 lg:hidden"
            >
              <Play size={16} />
              Preview
            </button>
          </div>

          <div className="flex-1 my-4 space-y-5">
            {/* Business Name and Invoice # */}
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">Business Name</label>
                <input 
                  type="text" 
                  value={fromName} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFromName(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">Invoice #</label>
                <input 
                  type="text" 
                  value={invoiceNumber} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInvoiceNumber(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
                />
              </div>
            </div>

            {/* Email and Issue Date */}
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">Email</label>
                <input 
                  type="email" 
                  value={fromEmail} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFromEmail(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">Invoice Date</label>
                <input 
                  type="date" 
                  value={issueDate} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setIssueDate(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background dark:[color-scheme:dark]" 
                />
              </div>
            </div>

            {/* Client Name and Due Date */}
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">Client Name</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setClientName(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">Due Date</label>
                <input 
                  type="date" 
                  value={dueDate} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background dark:[color-scheme:dark]" 
                />
              </div>
            </div>
            
            {/* Currency and Tax Rate */}
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">Currency Symbol</label>
                <input 
                  type="text" 
                  maxLength={3} 
                  value={currency} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrency(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">VAT (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={taxRate} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTaxRate(Number(e.target.value))}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
                />
              </div>
            </div>

            {/* From Address and To Address */}
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">From Address</label>
                <textarea 
                  value={fromAddress} 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFromAddress(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background min-h-24" 
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">To Address</label>
                <textarea 
                  value={clientAddress} 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setClientAddress(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background min-h-24" 
                />
              </div>
            </div>

            {/* Line Items Dynamic Section */}
            <div className="space-y-3">
              <label className="font-semibold capitalize text-sm">Line Items</label>
              <div className="space-y-3">
                {items.map((item: InvoiceItem) => (
                  <div key={item.id} className="flex gap-3 items-end p-3 border border-border rounded-xl bg-background flex-col md:flex-row">
                    <div className="flex-1 w-full space-y-1">
                      <label className="text-xs text-muted-foreground">Description</label>
                      <input 
                        type="text" 
                        value={item.description}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Item description"
                        className="border border-border w-full p-2.5 rounded-lg text-sm bg-card"
                      />
                    </div>
                    <div className="w-full md:w-24 space-y-1">
                      <label className="text-xs text-muted-foreground">Qty</label>
                      <input 
                        type="number" 
                        min="1"
                        value={item.quantity}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateItem(item.id, "quantity", Number(e.target.value))}
                        className="border border-border w-full p-2.5 rounded-lg text-sm bg-card"
                      />
                    </div>
                    <div className="w-full md:w-32 space-y-1">
                      <label className="text-xs text-muted-foreground">Unit Price</label>
                      <input 
                        type="number" 
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateItem(item.id, "price", Number(e.target.value))}
                        className="border border-border w-full p-2.5 rounded-lg text-sm bg-card"
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2.5 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/25 transition-colors self-end md:self-auto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" 
                onClick={addItem}
                className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={16} /> Add item
              </button>
            </div>

            {/* VAT Reg and Phone */}
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">VAT Reg</label>
                <input 
                  type="text" 
                  value={vatReg} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setVatReg(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="font-semibold capitalize text-sm">Cell / Phone</label>
                <input 
                  type="text" 
                  value={fromPhone} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFromPhone(e.target.value)}
                  className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
                />
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <label className="font-semibold capitalize text-sm">Notes</label>
              <textarea 
                value={notes} 
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                className="border border-border w-full p-3 rounded-xl text-base transition-colors bg-background" 
              />
            </div>

            {formError && <p className="text-destructive text-sm font-medium">{formError}</p>}
          </div>

          {/* Download PDF Action Button */}
          <div>
            <button 
              onClick={handleDownloadPDF}
              className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-95 transition-opacity"
            >
              Download PDF
            </button>
          </div>
        </main>

        {/* Desktop Live Preview Sidebar Panel */}
        <aside className="hidden lg:flex flex-col flex-1 p-5 rounded-2xl border-2 border-border bg-card shadow-md">
          <h2 className="text-2xl font-bold mb-1">Live Preview</h2>
          <p className="text-muted-foreground text-sm mb-4">Instant visual confirmation of your output document.</p>
          <InvoicePreview {...previewProps} />
        </aside>
      </div>

      {/* Mobile Popup Modal for Live Preview */}
      {isOpen && (
        <div className="fixed bg-background/90 backdrop-blur-xl w-full h-full top-0 left-0 z-50 p-5 flex flex-col">
          <div className="h-15 px-5 flex items-center justify-between border-b border-border">
            <h2 className="text-2xl font-bold">Live Preview</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="bg-primary text-primary-foreground flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-95 shadow"
              >
                <Download size={16} />
                Download PDF
              </button>
              <button
                onClick={() => setIsOpen(false)} 
                className="bg-secondary text-secondary-foreground flex items-center gap-2 p-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto mt-4">
            <InvoicePreview {...previewProps} />
          </div>
        </div>
      )}
    </div>
  );
}