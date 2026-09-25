import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "@/components/BookingModal";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DriveX | Drive More. Experience More.",
  description: "Premium cars, flexible rentals, and a smarter way to move.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <BookingProvider>
          <Navbar />
          {children}
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
