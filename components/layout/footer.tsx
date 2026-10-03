import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Footer. Copy: approved `content/copyright.md`. Flagged items omitted until
 * real content exists: contact email, Imprint/Privacy pages, social links.
 */
export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      <div className="container-xl flex flex-col gap-12 py-16 md:flex-row md:items-end md:justify-between">
        <div>
            <p className="text-text-primary">
            <Wordmark logoClassName="h-13.5 w-auto" />
          </p>
          <p className="mt-2 font-body text-small text-text-muted">
            A technology and design studio.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-small text-text-secondary transition-colors duration-[180ms] ease-facet hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="font-body text-small text-text-muted">
          © {new Date().getFullYear()} FlowForge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
