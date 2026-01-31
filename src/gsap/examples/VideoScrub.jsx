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
      currentTime: video.duration || 1, // fallback
      ease: "none", // ← very important for clean scrubbing
      paused: true,
      immediateRender: false,
      ...vars,
    },
  );

  // Force initial seek + prevent auto-play weirdness
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
    // Some browsers need this extra kick
    video.currentTime = 0.01;
    video.currentTime = 0;
  };

  if (video.readyState >= 1) {
    onMetadata();
  } else {
    video.addEventListener("loadedmetadata", onMetadata, { once: true });
  }

  video.addEventListener("canplaythrough", reset, { once: true });

  return tween;
}

const VideoScrub = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const scrubTween = videoScrub(video, {
        scrollTrigger: {
          trigger: containerRef.current, // or video itself — both ok
          start: "top top", // more reliable than "center center" in many cases
          end: "+=2000", // pixels of scroll distance — adjust to taste (1500–4000 common)
          scrub: true, // direct / immediate = best for video
          pin: true,
          pinSpacing: true,
          anticipatePin: 1, // smoother pin start on mobile
          invalidateOnRefresh: true,
          // markers: true,                // ← turn on to debug positions
        },
      });

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
      }}
    >
      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          width: "90%",
          maxWidth: "1200px",
          height: "auto",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
};

export default VideoScrub;
