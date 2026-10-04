"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";

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
  const pathname = usePathname();
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
          className="text-text-primary transition-colors duration-[180ms] ease-facet hover:text-accent"
          aria-label="FlowForge — home"
        >
          <Wordmark
            priority
            logoClassName="h-12 w-auto md:h-15"
            textClassName="text-caption font-medium uppercase tracking-caption md:text-h5 md:normal-case md:tracking-normal"
          />
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
          className="animate-fade-in fixed inset-0 z-80 flex flex-col bg-glass-menu pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] backdrop-blur-glass md:hidden"
        >
          {/* Close lives in the screen corner, not in the content row: the
              top-right corner is the reachable, expected dismissal target on
              touch, and it keeps the masthead row to the wordmark alone. */}
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-0 top-[env(safe-area-inset-top)] z-[999] pointer-events-auto flex h-16 w-16 items-center justify-center text-text-primary transition-colors duration-[180ms] ease-facet hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
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

          {/* Masthead — logo stays centered in the mobile viewport */}
          <div className="relative flex h-16 shrink-0 items-center justify-center border-b border-glass-border text-text-primary">
            <Wordmark
              logoClassName="h-12 w-auto"
              textClassName="text-caption font-medium uppercase tracking-caption"
            />
          </div>

{/* Index sits at the top, directly under the masthead.

              justify-start, not justify-center: with flex-1 the link rows used
              to float in the middle of the available space, leaving ~170px of
              dead space above them on a typical phone and reading as "the menu
              items are centered". Top-anchored, the list reads as an index
              that begins where the masthead ends. The CTA below still sits at
              the bottom of the overlay. */}
          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-start"
          >
            {/* Each row carries ml-[max(20px)] — the requested extra left inset,
                on top of the container's 24px gutter, so labels sit 44px from
                the screen edge. Paired with w-[calc(100%_-_max(20px))] rather
                than w-full: a margin-left next to a full-width box would
                overflow 20px past the right edge and open a horizontal
                scrollbar inside the overlay. The calc keeps the right edge
                flush, so the row dividers still end at the container's right
                edge. FlowForge stays centered above. */}
            {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-16 w-full items-center border-b border-border-subtle pl-6 pr-6 font-body text-caption font-medium uppercase tracking-caption transition-colors duration-[180ms] ease-facet active:text-text-primary sm:pl-8 sm:pr-8 md:pl-10 md:pr-10 ${
                    active ? "text-text-primary" : "text-text-muted"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-accent"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="shrink-0 border-t border-glass-border pt-6 pb-6 pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-10 md:pr-10">
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
