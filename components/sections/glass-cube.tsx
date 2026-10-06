"use client";

import { useEffect, useRef } from "react";

const CUBE_SRC_DESKTOP = "https://res.cloudinary.com/a50bglxq/video/upload/v1790577181/finalfckingvideo.mp4";
const CUBE_SRC_MOBILE = "/media/videos/wvideo.mp4";
const MOBILE_QUERY = "(max-width: 767px)"; // matches the md: breakpoint

/**
 * Glass Cube — the primary signature visual of Facet.
 * Hero only. Native HTML5 video: muted, loop, playsInline, no controls.
 * Source is chosen by viewport: desktop streams the Cloudinary asset, mobile
 * uses the local, compressed `public/media/videos/cube.mp4` (kebab-case,
 * < 8 MB) to save mobile bandwidth. The video remains ambient and
 * non-blocking; if playback is denied the layout still falls back cleanly.
 */
export function GlassCube({ className = "" }: { className?: string }) {
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
        // Silent fallback: do not block the hero if autoplay is denied.
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

  // Pick the local mobile asset vs the desktop CDN stream by viewport, and
  // re-apply live when the user crosses the md: breakpoint mid-session.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applySource = () => {
      const src = window.matchMedia(MOBILE_QUERY).matches
        ? CUBE_SRC_MOBILE
        : CUBE_SRC_DESKTOP;
      if (video.getAttribute("src") !== src) {
        video.setAttribute("src", src);
        video.load();
      }
    };

    applySource();
    const mq = window.matchMedia(MOBILE_QUERY);
    mq.addEventListener("change", applySource);
    return () => mq.removeEventListener("change", applySource);
  }, []);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        className="h-full w-full scale-[1.06] object-cover"
      />
    </div>
  );
}