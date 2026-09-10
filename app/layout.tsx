import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#535759",
};

export const metadata: Metadata = {
  title: "STOMRIM Investment CC",
  description: "Generate clean, tax-compliant invoices instantly",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png", // Standard browsers
    apple: "/logo.png", // Tells iOS to use this specific icon
  },
  appleWebApp: {
    capable: true, // Enables the standalone iOS experience
    title: "STOMRIM", 
    statusBarStyle: "black-translucent", // Blends the iOS status bar with your app
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
