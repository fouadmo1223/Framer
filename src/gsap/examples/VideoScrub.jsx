import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function videoScrub(video, vars = {}) {
  video = gsap.utils.toArray(video)[0];
  if (!video) return null;

  const tween = gsap.fromTo(
    video,
    { currentTime: 0 },
    {
      currentTime: video.duration || 1,
      ease: "none",
      paused: true,
      immediateRender: false,
      ...vars,
    },
  );

  const reset = () => {
    video.currentTime = 0;
    video.pause();
    if (video.duration) {
      tween.vars.currentTime = video.duration;
      tween.invalidate();
    }
  };

  const onMetadata = () => {
    reset();
    // Helps some browsers kickstart seeking
    video.currentTime = 0.04;
    setTimeout(() => (video.currentTime = 0), 50);
  };

  if (video.readyState >= 1) {
    onMetadata();
  } else {
    video.addEventListener("loadedmetadata", onMetadata, { once: true });
  }

  video.addEventListener("canplaythrough", reset, { once: true });

  return tween;
}

export default function VideoScrub() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const scrubTween = videoScrub(video, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500", // scroll distance in pixels — increase for slower scrub
          scrub: true, // direct scrubbing (best for video)
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // markers: true,           // ← turn on to visualize trigger start/end lines
        },
      });

      // Fade in once playable (visual feedback)
      gsap.set(video, { opacity: 0 });
      video.addEventListener(
        "canplay",
        () => gsap.to(video, { opacity: 1, duration: 0.8 }),
        { once: true },
      );

      return () => {
        if (scrubTween) scrubTween.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        width: "100%",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <video
        ref={videoRef}
        src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          width: "92%",
          maxWidth: "1280px",
          height: "auto",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
          objectFit: "contain",
        }}
      />

      {/* Scroll hint overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          color: "#fff",
          fontSize: "2rem",
          fontWeight: "bold",
          textShadow: "0 4px 12px rgba(0,0,0,0.9)",
          zIndex: 5,
        }}
      >
        Scroll Down to Scrub Video
      </div>
    </div>
  );
}
