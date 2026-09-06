import React from "react";
import Image from "next/image";
import { InvoiceItem } from "@/lib/generate-invoice-pdf";

interface InvoicePreviewProps {
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

export default function InvoicePreview({
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
}: InvoicePreviewProps) {
  // Calculate subtotal, tax amount, and final total based on line items and tax rate
  const subtotal: number = items.reduce((acc: number, item: InvoiceItem) => acc + item.quantity * item.price, 0);
  const taxAmount: number = (subtotal * (taxRate || 0)) / 100;
  const total: number = subtotal + taxAmount;

  return (
    <div className="bg-white text-gray-900 rounded-xl p-6 flex-1 overflow-y-auto shadow-inner text-sm space-y-6">
      {/* Top Header Section: Logo, Business Info, and Invoice Meta */}
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 p-1">
            <Image 
              src={logoSrc} 
              alt="Logo" 
              fill 
              className="object-contain" 
            />
          </div>
          <div>
            <h3 className="text-xl font-extrabold">{fromName || "Business Name"}</h3>
            <p className="text-xs text-gray-500 whitespace-pre-line mt-1">{fromAddress}</p>
          </div>
        </div>
        <div className="text-right">
          <h4 className="text-lg font-bold">INVOICE</h4>
          <p className="text-gray-500"># {invoiceNumber}</p>
          <p className="text-xs text-gray-500 mt-1">Date: {issueDate}</p>
          {dueDate && <p className="text-xs text-gray-500">Due: {dueDate}</p>}
        </div>
      </div>

      {/* Sender and Billed To Information Box */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">From</p>
          <p className="font-medium">{fromEmail}</p>
          {fromPhone && <p className="text-xs text-gray-600">{fromPhone}</p>}
          {vatReg && <p className="text-xs text-gray-600">VAT Reg: {vatReg}</p>}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Billed To</p>
          <p className="font-medium">{clientName || "Client Name"}</p>
          <p className="text-xs text-gray-500 whitespace-pre-line mt-1">{clientAddress}</p>
        </div>
      </div>

      {/* Line Items Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-2 text-left font-semibold">Description</th>
            <th className="p-2 text-center font-semibold">Qty</th>
            <th className="p-2 text-right font-semibold">Unit Price</th>
            <th className="p-2 text-right font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: InvoiceItem) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="p-2">{item.description || "—"}</td>
              <td className="p-2 text-center">{item.quantity}</td>
              <td className="p-2 text-right">{currency} {Number(item.price).toFixed(2)}</td>
              <td className="p-2 text-right">{currency} {(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Summary Section */}
      <div className="flex flex-col items-end space-y-1 pt-2">
        <div className="flex justify-between w-48 text-gray-600">
          <span>Subtotal:</span>
          <span>{currency} {subtotal.toFixed(2)}</span>
        </div>
        {taxRate > 0 && (
          <div className="flex justify-between w-48 text-gray-600">
            <span>VAT (${taxRate}%):</span>
            <span>{currency} {taxAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between w-48 font-bold text-base border-t border-gray-300 pt-1">
          <span>Total:</span>
          <span>{currency} {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Optional Notes Section */}
      {notes && (
        <div className="border-t border-dashed border-gray-200 pt-3 text-xs text-gray-500">
          <span className="font-semibold">Notes: </span>{notes}
        </div>
      )}
    </div>
  );
}