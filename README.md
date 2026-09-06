<div align="center">

<img src="./app/favicon.ico" alt="STOMRIM Invoice App Logo" width="90" />

# STOMRIM Invoice App

### A modern, responsive invoice generator with live previews and instant PDF downloads

Generate professional invoices directly from your browser. Add your business information, client details, line items, VAT, notes, and download a polished PDF invoice in seconds.

<br />

![Next.js](https://img.shields.io/badge/Next.js-16.3.4-000000?style=for-the-badge\&logo=next.js\&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-PDF_Generation-D32F2F?style=for-the-badge)
![License](https://img.shields.io/badge/License-Private-535759?style=for-the-badge)

</div>

---

## Table of Contents

* [About the Project](#about-the-project)
* [Key Features](#key-features)
* [How It Works](#how-it-works)
* [Application Preview](#application-preview)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Running the Application](#running-the-application)
* [Using the Invoice Generator](#using-the-invoice-generator)

  * [Business Information](#1-business-information)
  * [Invoice Information](#2-invoice-information)
  * [Client Information](#3-client-information)
  * [Currency and VAT](#4-currency-and-vat)
  * [Line Items](#5-line-items)
  * [Additional Information](#6-additional-information)
  * [Live Preview](#7-live-preview)
  * [Downloading the PDF](#8-downloading-the-pdf)
* [Invoice Calculations](#invoice-calculations)
* [PDF Generation](#pdf-generation)
* [Automatic Invoice Numbering](#automatic-invoice-numbering)
* [Theme Support](#theme-support)
* [Responsive Design](#responsive-design)
* [Project Architecture](#project-architecture)
* [Core Components](#core-components)
* [Customizing the Application](#customizing-the-application)
* [Changing the Logo](#changing-the-logo)
* [Changing the Default Business Information](#changing-the-default-business-information)
* [Changing the Colors](#changing-the-colors)
* [Adding More Invoice Fields](#adding-more-invoice-fields)
* [Available Scripts](#available-scripts)
* [Dependencies](#dependencies)
* [Troubleshooting](#troubleshooting)
* [Future Improvements](#future-improvements)
* [Contributing](#contributing)

---

# About the Project

**STOMRIM Invoice App** is a browser-based invoice generator designed to make creating professional invoices fast and simple.

The application provides an interactive form where users can enter:

* Business information
* Invoice numbers
* Contact information
* Client details
* Invoice dates
* Due dates
* Currency symbols
* VAT percentages
* Multiple invoice items
* Quantities
* Unit prices
* VAT registration information
* Phone numbers
* Additional notes

As the user updates the form, the invoice preview updates automatically.

Once the invoice is ready, the application generates and downloads a professional PDF document directly in the browser.

The application does not require a backend server for invoice generation. The PDF is generated client-side using `jsPDF` and `jspdf-autotable`.

---

# Key Features

## Professional Invoice Creation

Create structured invoices containing business information, client information, invoice metadata, itemized charges, VAT, totals, and notes.

---

## Live Invoice Preview

Changes made to the invoice form are immediately reflected in the preview.

This allows users to visually review the invoice before downloading the final PDF.

---

## Dynamic Line Items

Add or remove invoice items as needed.

Each line item includes:

* Description
* Quantity
* Unit price
* Automatically calculated total

The application always keeps at least one invoice item available.

---

## Automatic Calculations

The application automatically calculates:

* Line item totals
* Invoice subtotal
* VAT amount
* Final invoice total

No manual calculations are required.

---

## VAT Support

Enter a VAT percentage and the application automatically calculates the tax amount.

For example:

```text
Subtotal: N$ 1,000.00

VAT Rate: 15%

VAT Amount:
N$ 150.00

Final Total:
N$ 1,150.00
```

If the VAT rate is set to `0`, the VAT section is hidden from the invoice totals.

---

## PDF Export

Download a professional invoice as a PDF.

The generated PDF includes:

* Business name
* Application logo
* Invoice number
* Issue date
* Due date
* Sender information
* Client information
* Itemized invoice table
* Subtotal
* VAT
* Final total
* Optional notes

---

## Automatic Invoice Number Incrementing

After successfully downloading an invoice, the application attempts to automatically increment the invoice number.

For example:

```text
Current Invoice Number:
000125

After Download:
000126
```

Leading zeros are preserved when possible.

---

## Dark Mode

The application supports both light and dark themes.

The selected theme is stored in the browser using `localStorage`.

The application also detects the user's system preference when no saved preference exists.

---

## Responsive Design

The interface adapts to different screen sizes.

### Desktop

On large screens:

* The invoice form appears on one side.
* The live invoice preview appears beside it.

### Mobile

On smaller screens:

* The form uses the full available screen width.
* A Preview button opens the invoice preview in a dedicated modal.
* The PDF can also be downloaded directly from the preview modal.

---

## Browser-Based PDF Generation

The application generates PDFs directly in the browser.

This means:

* No invoice data needs to be sent to a server.
* No backend API is required for PDF generation.
* Users can download invoices immediately.

---

# How It Works

The invoice generation process follows this workflow:

```text
User enters invoice information
            ↓
React state updates
            ↓
Live preview updates automatically
            ↓
User reviews invoice
            ↓
User clicks Download PDF
            ↓
Application validates required fields
            ↓
Invoice totals are calculated
            ↓
jsPDF creates the PDF
            ↓
Browser downloads the invoice
            ↓
Invoice number is automatically incremented
```

---

# Application Preview

The application is divided into two primary sections.

## Invoice Details

The main form allows the user to configure all invoice information.

Users can update:

* Business details
* Invoice details
* Client information
* Currency
* VAT
* Addresses
* Line items
* Contact information
* Notes

## Live Preview

The preview displays a visual representation of the invoice.

It updates immediately whenever form information changes.

The preview includes:

```text
┌─────────────────────────────────────────────┐
│ Logo                 INVOICE                │
│ Business Name        Invoice Number         │
│                      Date                   │
│                      Due Date               │
├─────────────────────────────────────────────┤
│ FROM                  BILLED TO             │
│ Business Email        Client Name           │
│ Phone                 Client Address        │
│ VAT Registration                            │
├─────────────────────────────────────────────┤
│ Description │ Qty │ Unit Price │ Total     │
├─────────────────────────────────────────────┤
│ Item 1      │  1  │ N$ 100.00  │ N$ 100.00 │
│ Item 2      │  2  │ N$ 50.00   │ N$ 100.00 │
├─────────────────────────────────────────────┤
│                         Subtotal  N$ 200.00 │
│                         VAT       N$ 30.00  │
│                         Total     N$ 230.00 │
├─────────────────────────────────────────────┤
│ Notes                                       │
└─────────────────────────────────────────────┘
```

---

# Technology Stack

The project is built using modern React and Next.js technologies.

| Technology      | Purpose               |
| --------------- | --------------------- |
| Next.js         | Application framework |
| React           | User interface        |
| TypeScript      | Type safety           |
| Tailwind CSS    | Styling               |
| jsPDF           | PDF generation        |
| jspdf-autotable | PDF table generation  |
| Lucide React    | Interface icons       |

---

## Next.js

Next.js provides the application framework and project structure.

It is responsible for:

* Application routing
* React rendering
* Asset management
* Development tooling
* Production builds

---

## React

React manages the interactive invoice form and application state.

The application uses React state to manage:

```text
Business information
Invoice information
Client information
Line items
VAT
Notes
Theme state
Preview modal state
Validation messages
```

---

## TypeScript

TypeScript provides strong typing throughout the application.

Important interfaces include:

```ts
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}
```

And:

```ts
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
```

These interfaces ensure that invoice data remains consistent throughout the application.

---

## Tailwind CSS

Tailwind CSS is used for:

* Responsive layouts
* Spacing
* Typography
* Borders
* Colors
* Dark mode styling
* Component styling

The project uses Tailwind CSS version 4.

---

## jsPDF

`jsPDF` is responsible for generating the downloadable PDF.

It creates:

* A4 documents
* Invoice headers
* Text sections
* Client information
* Totals
* Notes

---

## jspdf-autotable

`jspdf-autotable` is used to generate the invoice item table.

The table includes:

```text
Description
Quantity
Unit Price
Total
```

The library automatically handles table layout and formatting.

---

## Lucide React

Lucide provides modern interface icons.

Icons are used for:

* Preview
* Add item
* Delete item
* Download
* Close modal
* Theme switching

---

# Project Structure

```text
invoice-app/
│
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── invoice-preview.tsx
│   └── theme-toggle.tsx
│
├── lib/
│   └── generate-invoice-pdf.ts
│
├── public/
│   └── logo.png
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# Folder and File Explanation

## `app/`

The `app` directory contains the main Next.js application.

---

### `app/page.tsx`

This is the main application page.

It manages:

* Invoice form state
* Line item state
* Form validation
* Preview state
* Invoice number updates
* PDF download actions

This file acts as the main controller for the invoice application.

---

### `app/layout.tsx`

This file defines the root application layout.

It manages:

* Application metadata
* Global fonts
* HTML configuration
* Application body layout

---

### `app/globals.css`

This file contains the global design system.

It defines:

* Light mode colors
* Dark mode colors
* Background colors
* Primary colors
* Secondary colors
* Surface colors
* Border colors
* Semantic colors
* Border radius values

---

### `app/favicon.ico`

The application favicon is also used as the visual logo throughout the application.

It appears in:

* The application header
* The invoice preview
* Generated PDF invoices

This means the favicon acts as the application's primary brand icon.

---

# `components/`

Reusable React components are stored here.

---

## `invoice-preview.tsx`

This component renders the live invoice preview.

It receives invoice information through props.

Example:

```tsx
<InvoicePreview
  fromName={fromName}
  invoiceNumber={invoiceNumber}
  fromEmail={fromEmail}
  issueDate={issueDate}
  dueDate={dueDate}
  clientName={clientName}
  clientAddress={clientAddress}
  currency={currency}
  taxRate={taxRate}
  fromAddress={fromAddress}
  vatReg={vatReg}
  fromPhone={fromPhone}
  notes={notes}
  items={items}
  logoSrc={logoSrc}
/>
```

The component calculates:

```text
Subtotal
VAT Amount
Final Total
```

The calculations are performed dynamically whenever the invoice data changes.

---

## `theme-toggle.tsx`

This component manages light and dark mode.

The theme preference is stored in:

```text
localStorage
```

When the application loads:

1. It checks whether a saved theme exists.
2. If no theme exists, it checks the user's system preference.
3. The appropriate theme is applied.
4. The selected theme is saved when the user switches themes.

---

# `lib/`

Utility functions and application logic are stored in this directory.

---

## `generate-invoice-pdf.ts`

This file contains the PDF generation logic.

The main function is:

```ts
generateInvoicePDF()
```

It performs the following steps:

```text
1. Creates a new A4 PDF document
2. Loads the invoice logo
3. Adds the business name
4. Adds the invoice title
5. Adds invoice metadata
6. Adds sender information
7. Adds client information
8. Calculates invoice totals
9. Generates the invoice items table
10. Displays VAT information
11. Displays the final total
12. Adds optional notes
13. Downloads the PDF
```

---

# Installation

Follow these steps to run the project locally.

---

## Prerequisites

Make sure you have the following installed.

### Node.js

You need a modern version of Node.js.

Check your installed version:

```bash
node --version
```

Check npm:

```bash
npm --version
```

If Node.js is not installed, download it from:

https://nodejs.org/

---

## Clone the Repository

Clone the project repository:

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd invoice-app-design
```

Replace the folder name if your repository uses a different name.

---

## Install Dependencies

Install all required dependencies:

```bash
npm install
```

This installs:

* Next.js
* React
* TypeScript
* Tailwind CSS
* jsPDF
* jspdf-autotable
* Lucide React

---

# Running the Application

Start the development server:

```bash
npm run dev
```

After the server starts, open:

```text
http://localhost:3000
```

The application should now be running locally.

---

# Using the Invoice Generator

The application is designed to be simple and straightforward.

Follow these steps to create an invoice.

---

# 1. Business Information

Enter your business details.

## Business Name

Enter the name of your business.

Example:

```text
STOMRIM Investment CC
```

This name appears:

* At the top of the invoice preview
* At the top of the generated PDF

---

## Email

Enter your business email address.

Example:

```text
business@example.com
```

The email appears in the `FROM` section of the invoice.

---

## From Address

Enter your business address.

You can use multiple lines.

Example:

```text
P.O. Box 123
Windhoek
Namibia
```

The address is displayed in the invoice header.

---

## Cell / Phone

Enter your business phone number.

Example:

```text
+264 81 123 4567
```

This information appears in the sender information section.

---

## VAT Registration Number

If your business is registered for VAT, enter the VAT registration number.

Example:

```text
CC/2017/10903
```

If the field is empty, the invoice preview and PDF will not display VAT registration information.

---

# 2. Invoice Information

## Invoice Number

Enter a unique invoice number.

Example:

```text
53897658
```

The invoice number appears:

* In the invoice preview
* In the generated PDF
* In the PDF file name

Example PDF file:

```text
Invoice_53897658.pdf
```

After downloading the PDF, the application automatically attempts to increase the invoice number.

---

## Invoice Date

Select the date the invoice was issued.

The application automatically uses the current date when the page is initially loaded.

---

## Due Date

Select an optional payment due date.

If a due date is entered, it appears in:

```text
Live Preview
Generated PDF
```

If no due date is provided, the due date section is omitted.

---

# 3. Client Information

## Client Name

Enter the name of the client or company being billed.

Example:

```text
Easy Farming Investment
```

The client name appears in the:

```text
BILLED TO
```

section.

---

## To Address

Enter the client's address.

Example:

```text
P.O. Box 524
Otjiwarongo
Namibia
```

The address supports multiple lines.

---

# 4. Currency and VAT

## Currency Symbol

Enter the currency symbol used on the invoice.

Examples:

```text
$
€
£
N$
R
```

The selected symbol is used throughout the invoice.

---

## VAT Percentage

Enter the VAT rate as a percentage.

Examples:

```text
0
5
10
15
20
```

Example:

```text
VAT Rate:
15%
```

The application calculates VAT automatically.

---

# 5. Line Items

Line items represent the products or services being billed.

Each line item contains three fields.

---

## Description

Describe the product or service.

Example:

```text
Transport of goods
```

---

## Quantity

Enter the number of units.

Example:

```text
3
```

---

## Unit Price

Enter the price of one unit.

Example:

```text
500
```

The application calculates:

```text
Line Total = Quantity × Unit Price
```

Example:

```text
Quantity:
3

Unit Price:
N$ 500

Line Total:
N$ 1,500
```

---

## Adding an Item

Click:

```text
+ Add item
```

A new invoice item will be added.

---

## Removing an Item

Click the delete button next to an item.

The application prevents the final remaining item from being deleted.

This ensures the invoice always contains at least one line item.

---

# 6. Additional Information

## Notes

Use the notes field to include additional information.

Example:

```text
Thank you for your business.

Payment is due within 30 days.
```

Notes are optional.

If no notes are entered, the notes section will not appear on the invoice.

---

# 7. Live Preview

The live preview automatically updates as information is entered.

You do not need to refresh the page.

The preview shows:

* Business name
* Business address
* Logo
* Invoice number
* Invoice dates
* Client information
* Invoice items
* Subtotal
* VAT
* Total
* Notes

---

## Desktop Preview

On larger screens, the live preview appears beside the invoice form.

This allows users to edit the invoice while immediately seeing the changes.

---

## Mobile Preview

On smaller screens, the preview is hidden by default to maximize available space.

Click:

```text
Preview
```

to open the live invoice preview.

The preview opens in a full-screen modal.

From the modal, users can:

```text
Download PDF
Close Preview
Review Invoice
```

---

# 8. Downloading the PDF

Once the invoice is complete, click:

```text
Download PDF
```

The application validates the required information.

The following fields are required:

```text
Business Name
Client Name
Invoice Number
```

If any required information is missing, the application displays an error.

Example:

```text
Please fill in all required fields
(Business Name, Client Name, Invoice #).
```

After successful validation:

```text
PDF generation begins
        ↓
Invoice is created
        ↓
Browser download starts
        ↓
Invoice number increments
```

---

# Invoice Calculations

The application performs all calculations automatically.

---

## Line Item Total

Each invoice item uses:

```text
Line Item Total = Quantity × Unit Price
```

Example:

```text
Quantity:
4

Unit Price:
N$ 250

Total:

4 × 250 = N$ 1,000
```

---

## Subtotal

The subtotal is calculated by adding all line item totals.

Formula:

```text
Subtotal = Item 1 + Item 2 + Item 3 + ...
```

Example:

```text
Item 1:
N$ 500

Item 2:
N$ 1,000

Item 3:
N$ 250

Subtotal:

N$ 1,750
```

---

## VAT Calculation

VAT is calculated using:

```text
VAT Amount = Subtotal × VAT Rate ÷ 100
```

Example:

```text
Subtotal:
N$ 1,000

VAT:
15%

Calculation:

1,000 × 15 ÷ 100

VAT Amount:
N$ 150
```

---

## Final Total

The final total is calculated using:

```text
Final Total = Subtotal + VAT Amount
```

Example:

```text
Subtotal:
N$ 1,000

VAT:
N$ 150

Final Total:

N$ 1,150
```

---

# PDF Generation

The application uses `jsPDF` to create PDF documents.

The generated document uses:

```text
Page Size:
A4

Orientation:
Portrait

Units:
Millimeters
```

---

## PDF Layout

The generated PDF contains several sections.

### Header

The header contains:

```text
Logo
Business Name
INVOICE Title
Invoice Number
Issue Date
Due Date
```

---

### Sender Information

The sender section contains:

```text
Email
Phone
VAT Registration Number
```

---

### Client Information

The client section contains:

```text
Client Name
Client Address
```

---

### Invoice Table

The invoice table contains:

```text
Description
Quantity
Unit Price
Total
```

---

### Financial Summary

The summary contains:

```text
Subtotal
VAT
Final Total
```

---

### Notes

If notes are provided, they appear at the bottom of the invoice.

---

# Automatic Invoice Numbering

After a successful PDF download, the application attempts to automatically increase the invoice number.

Example:

```text
Invoice Number:
53897658

After Download:

53897659
```

---

## Leading Zero Support

If your invoice number begins with zeros, the application attempts to preserve the same length.

Example:

```text
Current:
000099

After Download:

000100
```

This makes the application useful for businesses using structured invoice numbering systems.

---

# Theme Support

The application supports:

```text
Light Mode
Dark Mode
```

The theme can be changed using the theme toggle button.

---

## Theme Persistence

The selected theme is stored in:

```text
localStorage
```

This means the user's preference remains after refreshing the page.

---

## System Preference Detection

When the application is opened for the first time:

```text
Saved Theme?
    │
    ├── Yes → Use Saved Theme
    │
    └── No
         │
         ↓
Check System Preference
         │
         ├── Dark → Enable Dark Mode
         │
         └── Light → Enable Light Mode
```

---

# Responsive Design

The application is designed to work across multiple devices.

---

## Large Screens

Desktop layouts display:

```text
┌─────────────────────┬─────────────────────┐
│                     │                     │
│   Invoice Form      │    Live Preview     │
│                     │                     │
│                     │                     │
└─────────────────────┴─────────────────────┘
```

---

## Mobile Screens

Mobile layouts display:

```text
┌───────────────────────────┐
│ Invoice Form              │
│                           │
│ Business Information      │
│                           │
│ Client Information        │
│                           │
│ Line Items                │
│                           │
│ [ Preview ]               │
│                           │
│ [ Download PDF ]          │
└───────────────────────────┘
```

The preview can be opened when needed.

---

# Project Architecture

The project follows a simple component-based architecture.

```text
                    ┌──────────────────┐
                    │    app/page.tsx  │
                    │                  │
                    │ Main Application │
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ↓               ↓               ↓
      InvoicePreview    ThemeToggle     PDF Generator
             │               │               │
             ↓               ↓               ↓
        Live Invoice     Theme State      jsPDF
             │                               │
             │                               ↓
             └──────────────────────→ PDF Download
```

---

# Core Components

## Main Application

Location:

```text
app/page.tsx
```

Responsibilities:

* Stores invoice data
* Manages form inputs
* Manages line items
* Controls preview modal
* Validates required fields
* Generates PDFs
* Increments invoice numbers

---

## Invoice Preview

Location:

```text
components/invoice-preview.tsx
```

Responsibilities:

* Displays invoice information
* Calculates totals
* Displays VAT
* Displays line items
* Displays optional notes
* Displays the application favicon as the invoice logo

---

## Theme Toggle

Location:

```text
components/theme-toggle.tsx
```

Responsibilities:

* Switches themes
* Saves user preference
* Detects system preference
* Updates the HTML root element

---

## PDF Generator

Location:

```text
lib/generate-invoice-pdf.ts
```

Responsibilities:

* Creates PDF documents
* Converts images to Base64
* Adds the logo
* Creates the invoice header
* Creates invoice information sections
* Generates item tables
* Calculates totals
* Adds notes
* Downloads the PDF

---

# Customizing the Application

The application is designed to be easy to customize.

---

# Changing the Logo

The application currently uses the favicon as its logo.

The favicon is located at:

```text
app/favicon.ico
```

The application references it using:

```ts
const logoSrc = "/favicon.ico";
```

The same logo is used in:

* The application header
* The live invoice preview
* The generated PDF

---

## Using a Different Logo

If you want to use a different image, place it inside the `public` directory.

Example:

```text
public/logo.png
```

Then update:

```ts
const logoSrc = "/favicon.ico";
```

to:

```ts
const logoSrc = "/logo.png";
```

The new image will automatically be used by:

```text
Application Header
Invoice Preview
Generated PDF
```

---

# Changing the Default Business Information

Default values are defined in:

```text
app/page.tsx
```

For example:

```ts
const [fromName, setFromName] =
  useState<string>("STORM RIM INVESTMENT CC");
```

You can change this to:

```ts
const [fromName, setFromName] =
  useState<string>("Your Business Name");
```

You can also update the default:

```text
Email
Address
Client Name
Currency
VAT Registration Number
Phone Number
Notes
```

---

# Changing the Colors

Global colors are defined in:

```text
app/globals.css
```

The application uses CSS variables.

Example:

```css
:root {
  --background: #f7f6f2;
  --foreground: #000000;

  --surface: #ffffff;

  --primary: #535759;
  --primary-foreground: #ffffff;

  --secondary: #9A9D9E;
}
```

---

## Changing the Primary Color

Change:

```css
--primary: #535759;
```

to your preferred color.

Example:

```css
--primary: #2563eb;
```

This changes the application's primary visual color.

---

# Dark Mode Colors

Dark mode colors are defined inside:

```css
.dark {
}
```

Example:

```css
.dark {
  --background: #0d0d0d;
  --foreground: #e6e7e8;

  --surface: #141414;

  --primary: #9FA0A2;
}
```

You can customize these values to create your own dark theme.

---

# Adding More Invoice Fields

To add a new invoice field, update the application in three places.

---

## Step 1: Add State

Inside:

```text
app/page.tsx
```

Add a new state variable.

Example:

```ts
const [paymentTerms, setPaymentTerms] =
  useState<string>("");
```

---

## Step 2: Add the Form Input

Example:

```tsx
<div className="space-y-2">
  <label className="font-semibold text-sm">
    Payment Terms
  </label>

  <input
    type="text"
    value={paymentTerms}
    onChange={(e) => setPaymentTerms(e.target.value)}
    className="border border-border w-full p-3 rounded-xl"
  />
</div>
```

---

## Step 3: Add the Field to the Invoice Data

Update the invoice interface:

```ts
export interface GeneratePDFProps {
  // Existing fields

  paymentTerms: string;
}
```

Then pass the value into:

```text
InvoicePreview
generateInvoicePDF
```

---

## Step 4: Display the Field

Update:

```text
components/invoice-preview.tsx
```

and:

```text
lib/generate-invoice-pdf.ts
```

This ensures the new field appears in both:

```text
Live Preview
PDF Invoice
```

---

# Available Scripts

The project includes several npm scripts.

---

## Development Server

```bash
npm run dev
```

Starts the application in development mode.

---

## Production Build

```bash
npm run build
```

Creates an optimized production build.

---

## Start Production Server

```bash
npm run start
```

Runs the production application.

You must run:

```bash
npm run build
```

before using:

```bash
npm run start
```

---

## Lint the Project

```bash
npm run lint
```

Runs ESLint to check the project for potential issues.

---

# Dependencies

## Production Dependencies

### Next.js

```text
next
```

Provides the application framework.

---

### React

```text
react
react-dom
```

Provides the user interface and component system.

---

### jsPDF

```text
jspdf
```

Generates PDF documents.

---

### jsPDF AutoTable

```text
jspdf-autotable
```

Creates formatted invoice tables inside PDF documents.

---

### Lucide React

```text
lucide-react
```

Provides modern SVG icons.

---

## Development Dependencies

### TypeScript

```text
typescript
```

Provides static typing.

---

### Tailwind CSS

```text
tailwindcss
@tailwindcss/postcss
```

Provides the styling system.

---

### ESLint

```text
eslint
eslint-config-next
```

Provides code quality checks.

---

# Troubleshooting

## The Application Will Not Start

Make sure dependencies are installed:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

---

## Port 3000 Is Already in Use

Next.js may automatically use another port.

Check the terminal output.

You may see something similar to:

```text
Local: http://localhost:3001
```

Open the displayed URL in your browser.

---

## PDF Does Not Download

Check the following:

* Your browser allows downloads.
* No browser extension is blocking downloads.
* The required invoice fields are completed.

Required fields include:

```text
Business Name
Client Name
Invoice Number
```

---

## VAT Is Not Appearing

Ensure the VAT percentage is greater than:

```text
0
```

Example:

```text
15
```

If VAT is set to:

```text
0
```

the VAT row is hidden.

---

## Theme Is Not Saving

Make sure your browser allows:

```text
localStorage
```

The application uses localStorage to remember the selected theme.

---

## Logo Does Not Appear

Make sure the logo path is correct.

Current application logo:

```text
/favicon.ico
```

If using another image inside `public`:

```text
public/logo.png
```

Use:

```ts
const logoSrc = "/logo.png";
```

---

# Future Improvements

Potential future improvements include:

* [ ] Invoice history
* [ ] Saved invoices
* [ ] Invoice database
* [ ] Customer management
* [ ] Automatic invoice number management
* [ ] Editable company profiles
* [ ] Multiple business profiles
* [ ] Multiple invoice templates
* [ ] Custom logo upload
* [ ] PDF preview before download
* [ ] Invoice duplication
* [ ] Invoice search
* [ ] Invoice filtering
* [ ] Payment status tracking
* [ ] Paid and unpaid invoice states
* [ ] Email invoice directly to clients
* [ ] Recurring invoices
* [ ] Automatic payment reminders
* [ ] Multiple currencies
* [ ] Currency formatting
* [ ] Custom tax labels
* [ ] Custom invoice colors
* [ ] User authentication
* [ ] Cloud storage
* [ ] Export invoice data
* [ ] Printable invoice templates

---

# Contributing

Contributions are welcome.

To contribute:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project
cd invoice-app-design

# Install dependencies
npm install

# Create a new branch
git checkout -b feature/your-feature-name

# Start development
npm run dev
```

Make your changes and test the application before submitting a pull request.

---

# Development Guidelines

When contributing, please follow these principles.

## Keep Components Focused

Each component should have a clear responsibility.

Example:

```text
Invoice Preview
    ↓
Display invoice

Theme Toggle
    ↓
Manage theme

PDF Generator
    ↓
Generate PDF
```

---

## Maintain Type Safety

Use TypeScript interfaces for invoice data.

Avoid using:

```ts
any
```

unless absolutely necessary.

---

## Keep PDF and Preview Data Consistent

Whenever a new invoice field is added, make sure it is added to:

```text
Form State
        ↓
Invoice Props
        ↓
Live Preview
        ↓
PDF Generator
```

This ensures that the preview and generated PDF remain consistent.

---

# License

This project is currently private.

If you plan to make the project open source, consider adding a license such as:

```text
MIT License
Apache License 2.0
GPL License
```

---

# Author

Built for:

**STOMRIM Investment CC**

---

<div align="center">

<img src="./app/favicon.ico" alt="STOMRIM Invoice App Logo" width="70" />

<br />

### STOMRIM Invoice App

Create professional invoices. Preview instantly. Download with confidence.

Built with Next.js, React, TypeScript, Tailwind CSS, and jsPDF.

</div>
