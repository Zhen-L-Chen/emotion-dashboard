import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
});

// Helvetica Neue is a system font, so we'll define it in CSS variables

export const metadata: Metadata = {
  title: "paperminds",
  description: "Emotion AI Dashboard by paperminds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSerif.variable} antialiased`}
        style={{ fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, var(--font-roboto-serif), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
