import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FlowForge — Technology & Design Studio",
    template: "%s — FlowForge",
  },
  description:
    "FlowForge is a technology and design studio building AI systems, automation, and web products for teams that care how things are made.",
  // Open Graph images pending — OG assets not yet provided.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg-primary">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
