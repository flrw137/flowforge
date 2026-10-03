"use client";

import { useEffect, useRef } from "react";

/**
 * SectionVideoBackground — the ambient video stage behind a page section.
 *
 * Native HTML5 video: muted, loop, playsInline, no controls. Decorative only:
 * aria-hidden, pointer-events-none, and if playback is denied or fails the
 * page falls back cleanly to the flat token background. Paused entirely under
 * prefers-reduced-motion.
 *
 * Layout: the caller supplies the stage box. The established pattern is
 * `sticky top-0 h-svh w-full overflow-hidden` at every breakpoint, with the
 * page content pulled up over it via `-mt-[100svh]` — the stage stays pinned
 * for exactly as long as its section lasts, so the video cannot outlive the
 * section and never overlaps the footer.
 *
 * Framing: `object-cover` fills the stage, and the `md:scale-*` values set the
 * zoom and any deliberate horizontal stretch. Sources narrower than 16:9
 * crop the sides on a portrait viewport; spreading the scales slightly wider
 * than tall compensates without visible distortion. Mobile leaves the zoom
 * off — a portrait viewport already crops a landscape source heavily.
 */
export function SectionVideoBackground({
  src,
  className = "",
  videoClassName = "",
}: {
  src: string;
  /** Stage box — usually "sticky top-0 h-svh w-full overflow-hidden". */
  className?: string;
  /** Zoom/stretch for the video itself. */
  videoClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const tryPlay = async () => {
      try {
        if (video.readyState >= 2) {
          await video.play();
        }
      } catch {
        // Silent fallback: do not block the page if autoplay is denied.
      }
    };

    const events: Array<keyof HTMLMediaElementEventMap> = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
    ];

    events.forEach((event) => {
      video.addEventListener(event, tryPlay, { once: false });
    });

    void tryPlay();

    return () => {
      events.forEach((event) => {
        video.removeEventListener(event, tryPlay);
      });
    };
  }, []);

  return (
    <div className={`pointer-events-none relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover object-center ${videoClassName}`}
      />
    </div>
  );
}