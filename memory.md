# Memory — /work video background, glass cards, sticky section

Last updated: 2026-10-01

## What was built

- **`components/sections/work-video-background.tsx`** (new): decorative ambient video component for `/work`. Native HTML5 (`muted loop playsInline autoPlay preload="auto" object-cover`), `aria-hidden` + `pointer-events-none`, source `/media/videos/wkvideo.mp4` (~15.8 MB). Pauses under `prefers-reduced-motion`; play failures are swallowed silently. Stage/layout classes are passed in through its `className` prop, so callers can change the layout without editing the component.
- **`app/work/page.tsx`**: the page's background video went through two iterations — first as a plain `absolute inset-0` overlay, then rebuilt as a **section-scoped sticky stage**: stage is `aspect-video overflow-hidden md:sticky md:top-0 md:h-svh`; content layer is `relative z-10 md:-mt-[100svh]`; heading container padding is `pt-16 md:pt-40 pb-24`.
- **`components/sections/work-card.tsx`**: card surface changed from solid to glass — `border-glass-border bg-glass-card backdrop-blur-glass` (was `border-border-subtle bg-surface-primary`).
- **`app/globals.css`**: new token `--color-glass-card: rgba(3, 3, 3, 0.6)` in the glass section, documented as the card surface over the video.

## Decisions made

- **"The work section" = the `/work` page**, not the homepage "Selected work" section. Evidence: nav Work → `/work`, and the repo's videos are named per page (`contactVideo.mp4`, `stvideo.mp4`, `wkvideo.mp4`, `wvideo.mp4`). User applied only the work one so far and explicitly said "only that one".
- **Video backgrounds must be section-scoped `position: sticky`, never `position: fixed`.** Hard requirement from the user: the video can never outlive its section and appear behind the footer. Footer lives in `app/layout.tsx` as a sibling *outside* the section and must stay visually identical.
- **Glass cards are justified here** because they sit on a video; they reuse the existing navbar glass token system instead of hardcoded values. A dedicated `--color-glass-card` token was added rather than lowering the shared `--color-glass-bg` (navbar depends on the 0.75 value).
- **16:9 handling**: mobile gets a true in-flow `aspect-video` block (zero crop, no sticky); desktop gets a viewport-height sticky stage with `object-cover` so the video is never sized to the section's total card height.
- **Reduced motion**: video pauses; the sticky float effect is kept (scroll-native positioning, not an animation).

## Problems solved

- **Sticky gotcha**: `overflow-hidden` on the section (or any ancestor of the sticky element) silently breaks `position: sticky` — the ancestor becomes the scroll container. Clipping must live on the sticky stage itself. `body { overflow-x: clip }` in globals.css is safe (`clip` does not create a scroll container).
- Content is pulled over the pinned video with a negative margin that must exactly match the stage height (`md:-mt-[100svh]` ↔ `md:h-svh`).
- Used `svh` units to avoid iOS URL-bar viewport jumpiness.
- Tooling: full `npx tsc` / `npx eslint` runs time out at 120s on this Windows box. Use `./node_modules/.bin/tsc --noEmit` and `./node_modules/.bin/eslint <file>` with a ~240s timeout.

## Current state

- `/work` renders the sticky video background with glass cards; typecheck and lint pass clean.
- **Not yet visually verified in a browser** — the scroll behavior (video holds still → cards float → video releases → footer enters clean) has not been scroll-tested by the user.
- Unused videos waiting for the same treatment: `contactVideo.mp4`, `stvideo.mp4`. (`wvideo.mp4` is the mobile cube source, `video.mp4` is the final CTA visual.)
- There is **no `context/` directory** in this repo — `AGENTS.md` references `context/*.md` files and a progress tracker that do not exist. Only `docs/site-map.md` is present.

## Next session starts with

- Get visual confirmation of the `/work` sticky scroll on desktop and mobile before building further on the pattern. If the video reads too strongly behind the heading and cards, lower `--color-glass-card` in `app/globals.css` — it is now a single-token change.
- Likely next task: apply the same section-scoped sticky video treatment to the other pages, one video at a time (contact, then services/about), reusing the existing pattern rather than rebuilding it.

## Open questions

- `wkvideo.mp4` is ~15.8 MB and loads with `preload="auto"` — likely needs compression, or a CDN/mobile-source split like `glass-cube.tsx` uses for the hero cube.
- Whether the homepage "Selected work" section (`SelectedWork` / `CaseStudyCard`) should also get video or glass treatment, or stays solid as-is.
- What `stvideo.mp4` is intended for (services? about?).