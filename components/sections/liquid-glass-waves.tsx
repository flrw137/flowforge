"use client";

import { useEffect, useRef, useState } from "react";

const MUX_HLS_URL =
  "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

function supportsNativeHls(): boolean {
  if (typeof document === "undefined") return false;
  const video = document.createElement("video");
  return Boolean(video.canPlayType("application/vnd.apple.mpegurl"));
}

export function LiquidGlassWaves({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let hls: import("hls.js").default | null = null;
    let onLoadedData: (() => void) | null = null;

    const tryPlay = () => {
      el.play().then(
        () => setReady(true),
        () => {},
      );
    };

    const start = async () => {
      if (cancelled) return;

      if (supportsNativeHls()) {
        el.src = MUX_HLS_URL;
        if (el.readyState >= 2) {
          tryPlay();
        } else {
          onLoadedData = tryPlay;
          el.addEventListener("loadeddata", onLoadedData, { once: true });
        }
        return;
      }

      const { default: Hls } = await import("hls.js");
      if (cancelled || !Hls.isSupported()) return;

      hls = new Hls();
      hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal && hls) {
          hls.destroy();
          hls = null;
        }
      });
      hls.loadSource(MUX_HLS_URL);
      hls.attachMedia(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (onLoadedData) el.removeEventListener("loadeddata", onLoadedData);
      if (hls) {
        hls.destroy();
        hls = null;
      }
    };
  }, []);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        className={`h-full w-full object-cover transition-opacity duration-[450ms] ease-facet ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}