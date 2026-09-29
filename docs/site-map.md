# Site Map & Content Plan

Working document for the multi-page site. Update as pages get built.

> **IA decision (approved by the client):** the sitemap follows the
> design-references IA — Home, Services, Work, About, Insights, Contact.
> Work is served by `/case-studies` routes; there is no separate "Work" path.

## Pages

| Route | Purpose | Status |
|---|---|---|
| `/` | Landing page: Hero (Glass Cube + services tape), Selected Work, Final CTA (Liquid Glass Waves) | ✅ Done (2026-09-14; all sections live, empty work state is a flagged placeholder) |
| `/services` | Detailed capabilities: AI systems, automation, web design/development — editorial, carousel or index presentation | ⬜ Planned (route not built; nav links 404 until it lands) |
| `/case-studies` | Selected work index — large editorial project presentations | ✅ Done (2026-09-14; empty state until projects exist) |
| `/case-studies/[slug]` | Project detail template, data-driven from approved content | ✅ Done (2026-09-14; single reusable template; `notFound()` guards unknown slugs) |
| `/about` | Studio philosophy, approach, process — point of view, not a team grid | ⬜ Planned (route not built; nav links 404 until it lands) |
| `/insights` | Editorial content on AI, automation, technology, design | ⬜ Planned (route not built; ship empty index or defer — decision pending) |
| `/contact` | Discovery-call contact form (Route Handler → Resend, no DB) | ✅ Done (2026-09-14; placeholder address — swap in real inbox/destination) |
| `404` | Custom not-found page | ⬜ Planned (Next default `/_not-found` serves today) |

> For `/case-studies/[slug]`, add the client name + slug to the table above or
> to `my-app/content/case-studies.md` once content exists.

## Page copy

Copy lives in `my-app/content/`, one file per page:

```
home.md        services.md     case-studies.md
about.md       insights.md     contact.md
copyright.md
```

Copy flow: draft in `content/*.md` → approved by the client →
agents turn it into components → copy is finalized inside the page files.

**Rules:** do not invent headlines, metrics, client names, testimonials, or
extra sections. If a section has no approved copy, flag it.

## Standalone components expected

- Navbar (English-only labels; no login/signup/pricing)
- Hero (Glass Cube video — primary signature)
- GlassCube video component (MP4, autoplay/muted/loop/playsInline)
- LiquidGlassWaves component (Mux HLS + hls.js fallback, final CTA only)
- Services tape (hero strip, autonomous perpetual marquee — titles only, 28px) — merged with the hero (2026-09-14); no standalone Services section on Home
- Case study card + project detail template
- Insights article list
- Contact form (idle/submitting/success/failure states; Route Handler → Resend)
- Footer
- Shared UI: buttons, section headings, labels

## SEO & analytics checklist

- [ ] Per-page metadata + Open Graph images
- [ ] `sitemap.ts` + `robots.ts`
- [ ] Favicon / OG image assets in `my-app/public/`
- [ ] Analytics provider decided and wired in
