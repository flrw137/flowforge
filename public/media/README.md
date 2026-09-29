# Media Files

Working notes for `public/media/` — served at `/media/...` in the app.

## `videos/` — self-hosted MP4s (local playback)
- Use **MP4 (H.264)** for broad compatibility; consider adding WebM later.
- Name: `kebab-case.mp4` → `hero-showreel.mp4`, `service-ai-agents-demo.mp4`
- Keep hero/background loops **short (< 15s)** and **compressed** (target < 8 MB) so the page stays fast.
- Poster images (first-frame placeholder) go in `../images/` as `<name>-poster.jpg`.

## `images/` — still images
- `kebab-case.jpg/.png/.webp` → `og-home.jpg`, `team-photo.jpg`, `case-acme-dashboard.png`
- Prefer WebP/AVIF for photos when source quality allows.

## Embedded videos
When a video is a YouTube/Vimeo embed, it does **not** live here.
Track embeds in the page copy files (`my-app/content/*.md`) or docs, e.g.:
`embed: https://youtube.com/watch?v=... (autoplay off, lazy)`.

## Suggested subfolders as the library grows
```
videos/hero/    videos/services/    videos/case-studies/
images/og/      images/team/        images/case-studies/
```
