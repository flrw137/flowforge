# Media Files

Working notes for `public/media/` — served at `/media/...` in the app.

## `videos/` — self-hosted MP4s (local playback)
- Use **MP4 (H.264)** for broad compatibility; consider adding WebM later.
- **Must be H.264 `avc1` / 8-bit `yuv420p`.** Do not ship HEVC (`hvc1`), VP9, or
  AV1 as the only source. Desktop Chrome/Edge/Firefox have no HEVC decoder, so an
  HEVC background video renders as nothing at all — invisible rather than
  obviously broken, and only on desktops (Safari and most mobile browsers decode
  it, which makes it look like a responsive-CSS bug). Verify with
  `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,codec_tag_string,pix_fmt -of csv=p=0 <file>`.
- Encode with `-movflags +faststart` so playback starts without downloading the
  whole file.
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
