description: Global instructions for building the Facet premium AI / technology studio website
globs: *
alwaysApply: true

# FACET — AGENT INSTRUCTIONS

## 1. What this project is

Facet is a premium AI / technology / design studio.

The website is a static-first marketing experience designed to communicate:

* intelligence
* precision
* restraint
* design quality
* technical capability
* trust

Facet should feel like a high-end independent technology studio, not a generic AI agency, SaaS startup, or automation template.

AI is a core capability of the studio, but AI should NOT become the visual cliché of the website.

The visual language should be closer to a sophisticated design / technology practice than to a conventional "AI agency" landing page.

---

# 2. Core Creative Direction

The central principle is:

> One strong visual idea. Excellent typography. Intentional motion. Generous space.

Facet should feel premium because of:

1. Typography
2. Composition
3. Negative space
4. Project presentation
5. Interaction quality
6. Motion
7. One carefully controlled signature visual

Do not add visual effects simply because they are technically possible.

If an effect does not improve communication, hierarchy, interaction or brand recognition, remove it.

---

# 3. Brand Personality

Facet should communicate:

* intelligent
* quiet confidence
* editorial
* precise
* contemporary
* technical
* minimal
* human
* sophisticated

Avoid:

* hype
* startup clichés
* excessive futurism
* cyberpunk aesthetics
* "AI slop"
* generic SaaS UI
* excessive glassmorphism
* excessive gradients
* excessive particles
* excessive 3D
* visual noise

The website should feel designed, not decorated.

---

# 4. Source of Truth

Before implementing anything, read the following in this exact order:

1. `context/project-overview.md`
2. `context/ui-rules.md`
3. `context/design-references.md`
4. `context/build-plan.md`
5. `context/progress-tracker.md`
6. `my-app/docs/site-map.md`

Then inspect additional context files whenever the task requires them.

The research-derived sitemap is the source of truth for information architecture.

Do NOT assume that a premium agency website must contain:

* Home
* Projects
* Studio
* Journal
* Contact

Only implement pages and sections explicitly supported by the current sitemap / research.

Do not add pages simply because they are common in agency websites.

Do not expand the site unnecessarily.

---

# 5. Research-Derived Architecture

The original research identified several recurring patterns among premium AI / technology agencies:

* strong hero proposition
* carefully controlled signature visual
* capabilities / services
* selected work / case studies
* process / methodology
* restrained proof
* final CTA
* contact / inquiry

These are patterns, NOT automatic requirements.

Only implement a pattern when the current sitemap and project context support it.

The research should influence:

* hierarchy
* density
* section order
* content length
* interaction patterns
* visual restraint

It should not be treated as a template to copy.

---

# 6. Content Direction

All public-facing copy must follow the Facet editorial direction.

Language:

* English

Tone:

* premium
* editorial
* intelligent
* concise
* restrained
* precise
* confident
* human

Use short sentences.

Use few words.

Every sentence should have a purpose.

The copy must work with large typography and generous whitespace.

Avoid generic AI-agency language such as:

* "Unlock the power of AI"
* "Transform your business"
* "Cutting-edge AI solutions"
* "Next-generation technology"
* "AI-powered innovation"
* "Revolutionize your workflow"
* "Supercharge your business"
* "Future-proof your business"
* "Leverage the power of AI"
* "Seamless AI solutions"

Never compensate for weak copy with visual effects.

---

# 7. Primary Visual Signature — Glass Cube

Facet has one primary visual signature:

## Glass Cube

The cube is the principal 3D visual element of the website.

Asset:

`https://res.cloudinary.com/a50bglxq/video/upload/v1789061320/cube.mp4`

The cube should primarily belong to the Hero.

Its purpose is to communicate:

* precision
* systems
* engineering
* intelligence
* dimensionality
* restraint

The cube must remain visually dominant.

Do not introduce competing 3D objects into the Hero.

Do not add:

* floating particles
* star fields
* random spheres
* neural-network graphics
* abstract blobs
* decorative AI illustrations
* unrelated 3D objects

The cube should feel like a physical, carefully rendered object rather than a generic "AI visual."

---

# 8. Cube Video Behavior

The cube video is a visual asset, not a decorative background that should overpower the typography.

Use it according to the specifications in:

`context/build-plan.md`

General requirements:

* autoplay where supported
* muted
* loop
* playsInline
* responsive sizing
* optimized rendering
* no unnecessary controls
* no visible browser video UI
* appropriate fallback behavior

The implementation must not introduce unnecessary playback libraries if native video is sufficient.

If the source asset is already optimized for direct MP4 playback, prefer native HTML5 video.

Do not transform the cube into a fullscreen video background unless explicitly required by the approved design.

The Hero composition should preserve clear separation between:

* typography
* CTA
* navigation
* cube

The cube should support the composition rather than make the text difficult to read.

---

# 9. Secondary Visual — Liquid Glass Waves

Facet has a secondary visual asset:

`https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8`

This is an HLS stream hosted on Mux.

It must NOT compete with the cube.

Use it only where the approved sitemap/build plan calls for the secondary visual.

Preferred usage:

## Final CTA

The Liquid Glass Waves should appear once, preferably behind or around the final CTA.

It is an emotional closing visual, not a second identity.

Do not reuse it throughout the site.

Do not place it in the Hero if the cube is already the Hero signature.

---

# 10. HLS Video Implementation

The Liquid Glass Waves asset is an HLS `.m3u8` stream.

For browsers with native HLS support:

```js
video.canPlayType("application/vnd.apple.mpegurl")
```

use the source directly.

For browsers without native HLS support, use `hls.js`.

Expected behavior:

```text
Native HLS supported
→ video.src = MUX_URL

Native HLS unavailable
→ instantiate Hls
→ loadSource(MUX_URL)
→ attachMedia(video)
```

The implementation must also:

* autoplay
* muted
* loop where supported
* playsInline
* remain behind CTA content
* avoid blocking interaction
* clean up the HLS instance on unmount
* handle playback failure gracefully
* respect reduced-motion / reduced-media preferences where appropriate

Do not assume Mux behaves like CloudFront.

Do not replace the Mux URL with a CloudFront URL.

---

# 11. Video Layering

For fullscreen or large visual video sections, use a deliberate layer hierarchy.

Conceptually:

```text
Section
├── Video layer
├── Optional controlled overlay layer
└── Content layer
```

Do not add gradient overlays.

If content contrast is insufficient, solve the problem through:

* composition
* video positioning
* opacity
* solid tokenized surfaces
* typography
* spacing

Do not solve contrast problems by adding a generic black gradient over the entire video.

---

# 12. No Gradients

This is a hard constraint.

Never use:

* `linear-gradient`
* `radial-gradient`
* CSS gradient backgrounds
* gradient text
* gradient buttons
* gradient borders
* glow blobs
* gradient overlays

This includes third-party or copied UI patterns.

If an imported design reference uses gradients, do not reproduce them automatically.

Use the approved Facet design language instead.

Flat fills, real borders, shadows and actual visual assets are preferred.

---

# 13. Glassmorphism

Glass effects are allowed only when explicitly justified by the approved design.

Do not create a glassmorphism-heavy interface.

Avoid:

* glass cards everywhere
* blurred cards everywhere
* transparent UI layered on every section
* glowing glass borders
* decorative glass pills

The navbar may use a restrained translucent treatment if supported by the design references, but it must remain subtle.

The glass cube is a visual object.

Do not confuse the cube's physical material with a requirement to turn the entire UI into glass.

---

# 14. Color

Use design tokens exclusively.

Never hardcode:

* hex values
* RGB values
* HSL values
* raw Tailwind colors

Use the semantic tokens defined in:

`context/ui-tokens.md`

If a required color does not exist:

1. inspect the existing token architecture
2. do not invent a raw value
3. update the token system only if permitted by the project architecture

The green accent is a signal, not the dominant color.

Use it sparingly.

---

# 15. Typography

Typography is one of Facet's primary design elements.

Follow the typography system defined in the context files.

The intended direction is:

* strong editorial display typography
* restrained sans-serif body/UI typography
* large but controlled headlines
* generous whitespace
* deliberate line lengths

Do not blindly copy typography from external references.

Do not introduce additional fonts without checking:

`context/code-standards.md`

and the existing design system.

Avoid:

* excessive font weights
* decorative typography everywhere
* unnecessary uppercase text
* inconsistent type scales

---

# 16. Services — Interactive Carousel

If Services / Capabilities is present in the approved sitemap, it MUST be implemented as an interactive horizontal carousel.

Never replace it with a static grid of cards.

The carousel should support:

* one service fully visible
* optional one-item peek
* horizontal drag
* touch/swipe
* previous / next controls
* visible index
* keyboard accessibility
* reduced-motion behavior

The interaction should feel editorial rather than like a SaaS component library.

Recommended content structure:

```text
01
SERVICE NAME

Short editorial description.

Optional supporting statement.

CTA
```

Use approximately 4–6 services unless the approved sitemap requires otherwise.

Avoid:

* icon-heavy service cards
* identical rectangular cards
* excessive UI decoration
* long descriptions
* generic feature grids

The carousel should feel like one of the site's designed interactions.

---

# 17. Motion Principles

Motion must be:

* deliberate
* restrained
* smooth
* physical
* predictable

Motion should reinforce hierarchy and spatial relationships.

Avoid:

* constant animation
* excessive parallax
* bouncing elements
* elastic transitions
* random floating elements
* animation on every component
* unnecessary scroll hijacking
* dramatic scene changes

The cube should move like a physical object.

The Liquid Glass Waves should behave as a controlled ambient visual.

Do not create unrelated motion systems for every section.

---

# 18. Reduced Motion

Respect:

`prefers-reduced-motion`

When enabled:

* stop non-essential rotation
* reduce transitions
* remove decorative movement
* preserve content
* preserve hierarchy
* keep navigation and interactions usable

Motion must never be required to understand the website.

---

# 19. Responsive Design

Every page and component must work intentionally across:

* desktop
* tablet
* mobile

Do not simply shrink the desktop layout.

On mobile:

* maintain clear typography hierarchy
* preserve intentional whitespace
* keep the cube visually important without consuming the entire viewport
* make the services carousel touch-friendly
* maintain usable CTA targets
* avoid horizontal overflow
* avoid excessive video loading
* preserve content hierarchy

Mobile performance is part of the design quality.

---

# 20. Performance

Premium does not mean heavy.

Treat performance as a first-class requirement.

Prioritize:

* optimized assets
* responsive media
* lazy loading where appropriate
* lightweight animation
* GPU-conscious rendering
* minimal dependencies
* efficient DOM structure

Do not load large media unnecessarily.

Do not load the Liquid Glass Waves video on pages where it is not used.

Do not load the cube video globally if it only appears on the Hero.

Do not introduce a library for a problem already solved by the browser or existing project.

---

# 21. Static-First Architecture

Facet has no backend.

There is:

* no database
* no authentication
* no user sessions
* no persistent application state
* no queue
* no CRM
* no InsForge
* no Supabase
* no agent pipeline

The only server-touching functionality is the contact form.

Architecture:

```text
Browser
  ↓
Single Route Handler
  ↓
Email
  ↓
Response
```

Nothing is persisted.

If you find yourself reaching for a database, stop and re-evaluate the requirement.

---

# 22. Contact Form

The contact form may contain:

* Name
* Email
* Company
* Project type
* Project description
* Timeline
* Optional budget

Use the exact fields required by the sitemap.

Project type should reflect the actual services offered by Facet.

Budget must remain optional.

Do not create unnecessary application state or persistence.

---

# 23. Projects / Selected Work

If Projects / Selected Work / Case Studies exists in the approved architecture, it is one of the most important content areas.

Give the work significant visual space.

Prioritize:

* strong imagery
* editorial composition
* project hierarchy
* concise descriptions
* year
* project type
* restrained metadata

Avoid generic SaaS card grids unless explicitly required by the design references.

Fictional projects are permitted only where the content brief explicitly requires them.

Fictional projects must be credible.

Never fabricate:

* famous clients
* awards
* press
* partnerships
* impossible metrics
* unrealistic performance claims

---

# 24. Project Detail

If project detail pages exist, treat them as premium case studies.

Prioritize:

* context
* challenge
* thinking
* approach
* solution
* outcome

The page should communicate capability through the quality of the work.

Avoid turning the case study into a sales funnel.

---

# 25. CTA Philosophy

CTAs should be restrained.

Prefer language such as:

* View work
* Explore projects
* Start a conversation
* Discuss a project
* Get in touch

Use the exact copy established by the content context when available.

Do not repeat the same CTA unnecessarily.

Do not use aggressive conversion language.

---

# 26. Navigation

Navigation must remain minimal.

Follow the approved sitemap.

Do not add navigation items simply because a component or page exists.

Avoid:

* mega menus
* excessive dropdowns
* unnecessary utility links
* complicated navigation layers

The navigation should communicate the site's structure immediately.

---

# 27. Design References

Before implementing any page or major component:

1. Read `context/design-references.md`.
2. Inspect the five files in `designs/`.
3. Identify the relevant visual patterns.
4. `mainReference` has priority.
5. `ref4` is a tie-breaker only.

Do not average all references together.

Do not copy references literally.

Extract:

* spacing
* hierarchy
* typography
* composition
* interaction
* visual density
* image treatment
* motion

When logging a completed feature, record which reference(s) influenced it.

---

# 28. Existing Components

Before creating a new component:

1. Search the existing codebase.
2. Determine whether an equivalent component already exists.
3. Reuse or extend it where appropriate.
4. Avoid duplicate patterns.

Create a new component only when it represents a genuinely distinct pattern.

---

# 29. Third-Party Libraries

Before adding any dependency:

1. Read `context/code-standards.md`.
2. Check the approved stack.
3. Check existing dependencies.
4. Determine whether the browser or current stack already solves the problem.

The project may use approved technologies such as:

* React
* Vite
* Tailwind CSS
* Motion / Framer Motion
* Lucide React
* hls.js

but do not install any of them automatically if the existing project already provides the required functionality.

Do not add a dependency simply because an external reference used it.

---

# 30. Architecture Before Implementation

Use `/architect` before any non-trivial feature.

The architectural step should identify:

* affected files
* component boundaries
* state requirements
* animation approach
* media loading strategy
* responsive behavior
* accessibility
* performance implications
* reusable patterns

Do not immediately code complex features.

---

# 31. UI Pattern Capture

After implementing a reusable UI component:

Use `/imprint`.

Capture patterns such as:

* buttons
* carousel controls
* service carousel
* project cards
* metadata rows
* form fields
* navigation
* CTA sections
* video containers

The objective is consistency, not reinvention.

---

# 32. Review

Before a demo, or whenever something feels visually wrong:

Use `/review`.

Review:

### Visual

* hierarchy
* spacing
* typography
* composition
* visual restraint
* consistency with references

### Interaction

* mouse
* touch
* keyboard
* reduced motion
* loading states
* error states

### Responsive

* desktop
* tablet
* mobile
* overflow
* touch targets

### Performance

* video loading
* image loading
* animation cost
* bundle size
* unnecessary dependencies

### Anti-Slop

Look specifically for:

* gradients
* excessive glass
* giant rounded cards
* purple/blue AI aesthetics
* generic AI illustrations
* excessive particles
* unnecessary animation
* generic SaaS layouts

---

# 33. Failure Recovery

If the same problem persists after one corrective attempt:

Stop.

Do not continue guessing.

Use `/recover`.

Determine:

* what failed
* why it failed
* which assumption was incorrect
* what evidence is required

Then proceed based on evidence.

---

# 34. Progress Tracking

After every completed feature, update:

`context/progress-tracker.md`

Record:

* feature completed
* relevant files
* implementation status
* important decisions
* design reference(s) used
* media assets used
* unresolved issues

The tracker must represent the actual state of the project.

---

# 35. Implementation Order

Follow:

`context/build-plan.md`

Do not skip ahead because a later component appears easier.

If implementation conflicts with the build plan:

1. stop
2. inspect the relevant context
3. resolve the conflict
4. then implement

---

# 36. Decision Hierarchy

When making implementation decisions, use this priority:

1. Explicit user requirement
2. `context/project-overview.md`
3. `context/ui-rules.md`
4. `context/design-references.md`
5. `context/build-plan.md`
6. `my-app/docs/site-map.md`
7. Existing project architecture
8. Existing reusable components
9. General best practices

Do not override a higher-priority requirement with a lower-priority preference.

---

# 37. Non-Negotiable Anti-Slop Rules

Never introduce the following unless explicitly required:

* purple/blue AI gradients
* gradient text
* glowing blobs
* floating AI particles
* neural-network illustrations
* excessive glassmorphism
* giant rounded cards everywhere
* icon grids for every service
* meaningless statistics
* stock AI imagery
* generic "AI-powered" headlines
* excessive pills
* excessive shadows
* decorative dashboards with no purpose
* animation on every element
* multiple competing 3D signatures

If the design starts looking like a generic AI website:

STOP.

Return to:

`context/design-references.md`

and compare the implementation against the approved references.

---

# 38. Final Principle

Facet should feel designed, not decorated.

The objective is not to demonstrate how many technologies, animations, videos or AI effects can be placed on a page.

The objective is to create a website where:

**Typography communicates confidence.**

**The work communicates capability.**

**Interaction communicates intelligence.**

**Motion communicates precision.**

**Visual restraint communicates quality.**

The cube is the signature.

The Liquid Glass Waves are the secondary accent.

Everything else exists to support the content.

When in doubt:

> Remove before adding.
