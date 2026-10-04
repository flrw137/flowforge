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
 *
 * Dimming: `overlayClassName` adds the flat scrim between video and content
 * that the blurred-background pages use (`bg-bg-primary/70`). Flat token fill,
 * never a gradient. Left unset on pages where the reel is the point of the
 * section and should read at full strength.
 */
export function SectionVideoBackground({
  src,
  className = "",
  videoClassName = "",
  overlayClassName = "",
  preload = "auto",
}: {
  src: string;
  /** Stage box — usually "sticky top-0 h-svh w-full overflow-hidden". */
  className?: string;
  /** Zoom/stretch for the video itself. */
  videoClassName?: string;
  /** Flat scrim over the video, under the content — e.g. "bg-bg-primary/70". */
  overlayClassName?: string;
  preload?: "auto" | "metadata" | "none";
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
        // Called unconditionally. A muted video is always permitted to autoplay,
        // and the browser pulls whatever data it still needs to start. Gating this
        // on `readyState >= 2` deadlocks under preload="metadata": the browser
        // stops at readyState 1 (HAVE_METADATA), so the guard skips play() and the
        // data-dependent retry events below never fire either — leaving playback
        // entirely to the autoPlay attribute heuristic, which is not reliable.
        await video.play();
      } catch {
        // Autoplay denied: fall back to the flat token background, never block
        // the page.
      }
    };

    const events: Array<keyof HTMLMediaElementEventMap> = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
    ];

    events.forEach((event) => {
      video.addEventListener(event, tryPlay);
    });

    // Surface genuine load/decode failures — 404, wrong path, unsupported codec.
    // The stage is decorative and pointer-events-none, so without this a broken
    // source fails completely silently and just looks like missing styling.
    const onError = () => {
      console.error(
        `[SectionVideoBackground] failed to load ${src}`,
        video.error?.message ?? video.error?.code ?? video.networkState,
      );
    };

    video.addEventListener("error", onError);

    void tryPlay();

    return () => {
      events.forEach((event) => {
        video.removeEventListener(event, tryPlay);
      });
      video.removeEventListener("error", onError);
    };
  }, [src]);

  return (
    <div className={`pointer-events-none relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        webkit-playsinline="true"
        autoPlay
        preload={preload}
        disablePictureInPicture
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover object-center ${videoClassName}`}
      />
      {overlayClassName ? (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${overlayClassName}`}
        />
      ) : null}
    </div>
  );
}