import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Orbitron carries the wordmark only — the agency name is set in it everywhere
// it appears as a mark (navbar, mobile masthead, footer). It is never used for
// body copy or headings.
const orbitron = Orbitron({
  variable: "--font-orbitron",
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

// viewport-fit=cover lets the full-screen mobile menu pad itself out of the
// notch and home-indicator insets with env(safe-area-inset-*).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
    >
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
