"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`border-b py-1 font-body text-caption font-medium uppercase tracking-caption transition-colors duration-[180ms] ease-facet ${
        active
          ? "border-accent text-text-primary"
          : "border-transparent text-text-muted hover:border-border-default hover:text-text-primary"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Quiet glass treatment once the page scrolls; transparent at the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Escape closes, Tab is trapped inside, focus is moved into
  // the overlay on open and returned to the trigger on close (WCAG 2.4.3).
  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;

    // Move focus into the overlay as soon as React has painted it.
    closeRef.current?.focus();

    const overlay = overlayRef.current;
    const focusSelector =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !overlay) return;

      const nodes = overlay.querySelectorAll<HTMLElement>(focusSelector);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restore focus to the element that opened the menu.
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[280ms] ease-facet ${
        scrolled
          ? "border-b border-glass-border bg-glass-bg backdrop-blur-glass"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-xl flex h-16 items-center justify-between md:h-18">
        <Link
          href="/"
          className="font-display text-h5 font-medium text-text-primary"
          aria-label="FlowForge — home"
        >
          FlowForge
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <Button as="link" href="/contact" size="sm">
            Start a project
          </Button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className="flex h-12 w-12 items-center justify-center text-text-primary md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 7h18M3 12h18M3 17h18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>

    {/* Mobile overlay menu — sibling of the header, not a child.
        Once scrolled, the header gets `backdrop-filter`, which creates a
        containing block for fixed-position descendants and would trap a
        full-screen overlay inside the 64px header strip on mobile. */}
    {open ? (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="animate-fade-in fixed inset-0 z-80 flex flex-col bg-bg-primary md:hidden"
        >
          <div className="container-xl flex h-16 items-center justify-between">
            <span className="font-display text-h5 font-medium text-text-primary">
              FlowForge
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-12 w-12 items-center justify-center text-text-primary"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-xl flex flex-1 flex-col justify-center gap-8"
          >
            {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-h3 font-medium text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="container-xl pb-12">
            <Button
              as="link"
              href="/contact"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Start a project
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
