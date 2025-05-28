import type { Metadata } from "next";
import { Roboto_Serif, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400"],
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
        className={`${robotoSerif.variable} ${robotoMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-roboto-serif), 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
