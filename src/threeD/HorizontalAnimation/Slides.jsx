import { Image as DImage, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const { clamp } = THREE.MathUtils;

const slideData = [
  {
    url: "https://images.pexels.com/photos/39886326/pexels-photo-39886326.png",
    tag: "CHAPTER 01",
    title: "Wanderlust",
    desc: "Roam wild. Chase light.",
    imageEffect: "zoom", // photo pulls back from a tight crop
    textEffect: "slide", // lines slide in from alternating sides
  },
  {
    url: "https://images.pexels.com/photos/39957125/pexels-photo-39957125.jpeg",
    tag: "CHAPTER 02",
    title: "Solitude",
    desc: "Quiet roads speak loudest.",
    imageEffect: "flip", // photo tilts up into place
    textEffect: "flip", // lines flip down like cards
  },
  {
    url: "https://images.pexels.com/photos/18523946/pexels-photo-18523946.jpeg",
    tag: "CHAPTER 03",
    title: "Horizon",
    desc: "Always just beyond reach.",
    imageEffect: "spin", // photo straightens while pushing in
    textEffect: "zoom", // lines pop in with a bounce
  },
];

const ENTER_DURATION = 1.8; // seconds for the full entrance (image + text)
const EXIT_DURATION = 0.5;
const IMAGE_SPAN = 0.6; // image animates over the first 60% of the entrance
const TEXT_START = 0.25; // text begins once the image is underway
const STAGGER = [0, 0.12, 0.24]; // delay for tag, title, desc (fraction of progress)
const LINE_SPAN = 1 - TEXT_START - STAGGER[2];

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeOutBack = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

// Applies an entrance effect to the image group and sets the photo's crop zoom.
function applyImageEffect(group, material, effect, p) {
  const e = easeOutCubic(p);
  group.position.set(0, 0, 0);
  group.rotation.set(0, 0, 0);
  group.scale.setScalar(1);
  let zoom = 1;

  switch (effect) {
    case "zoom":
      zoom = 1.45 - 0.45 * e;
      break;
    case "flip":
      group.rotation.x = -(1 - easeOutBack(p)) * 0.6;
      zoom = 1.1;
      break;
    case "spin":
      group.rotation.z = -(1 - e) * 0.12;
      group.scale.setScalar(0.9 + 0.1 * e);
      zoom = 1 + 0.18 * e;
      break;
    default:
      break;
  }
  if (material) material.zoom = zoom;
}

// Applies an entrance effect to a line group and returns its opacity.
function applyEffect(group, effect, p, baseY, width, height, i) {
  const e = easeOutCubic(p);
  group.position.set(0, baseY, 0);
  group.rotation.set(0, 0, 0);
  group.scale.setScalar(1);

  switch (effect) {
    case "zoom":
      group.scale.setScalar(0.3 + 0.7 * easeOutBack(p));
      break;
    case "slide": {
      const dir = i % 2 === 0 ? -1 : 1;
      group.position.x = dir * (1 - e) * width * 0.25;
      break;
    }
    case "flip":
      group.rotation.x = -(1 - e) * Math.PI * 0.5;
      break;
    case "smooth":
      group.position.y = baseY - (1 - e) * height * 0.08;
      group.scale.setScalar(1.08 - 0.08 * e);
      break;
    case "fade":
    default:
      break;
  }
  return e;
}

function setOpacity(object, opacity) {
  object.visible = opacity > 0.01;
  object.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.transparent = true;
      child.material.opacity = opacity;
    }
  });
}

function Slide({ url, tag, title, desc, imageEffect, textEffect, index, refs }) {
  const { width, height } = useThree((state) => state.viewport);
  const imgGroup = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const lineRefs = useRef([]);
  const progress = useRef(0);

  const imgW = width * 0.8;
  const imgH = height * 0.8;
  const baseY = [height * 0.11, 0, -height * 0.1];

  useFrame((_, delta) => {
    const group = refs.current[index];
    if (!group) return;
    const x = group.position.x;
    const dist = Math.abs(x);
    const t = Math.max(0, 1 - dist / (width * 1.2));

    // Flat scroll: the centered slide zooms in
    group.scale.setScalar(0.85 + t * 0.25);

    // Entrance timeline: plays forward when centered, reverses quickly when leaving
    const active = t > 0.8;
    progress.current = active
      ? Math.min(1, progress.current + delta / ENTER_DURATION)
      : Math.max(0, progress.current - delta / EXIT_DURATION);
    const p = progress.current;

    const img = imgRef.current?.material;
    if (img) {
      img.transparent = true;
      img.opacity = 0.4 + t * 0.6;
      img.grayscale = 1 - t;
    }

    if (imgGroup.current) {
      const ip = clamp(p / IMAGE_SPAN, 0, 1);
      applyImageEffect(imgGroup.current, img, imageEffect, ip);
    }

    if (overlayRef.current) {
      overlayRef.current.material.opacity = easeOutCubic(p) * 0.4;
    }

    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      const lp = clamp((p - TEXT_START - STAGGER[i]) / LINE_SPAN, 0, 1);
      const opacity = applyEffect(line, textEffect, lp, baseY[i], width, height, i);
      setOpacity(line, opacity);
    });
  });

  const lines = [
    {
      text: tag,
      fontSize: width * 0.013,
      letterSpacing: 0.35,
      color: "#ffd9a0",
    },
    {
      text: title,
      fontSize: width * 0.065,
      letterSpacing: 0.02,
      color: "#ffffff",
      outlineWidth: width * 0.001,
    },
    {
      text: desc,
      fontSize: width * 0.022,
      letterSpacing: 0.04,
      color: "#f5f5f5",
      outlineWidth: width * 0.0005,
    },
  ];

  return (
    <>
      <group ref={imgGroup}>
        <DImage ref={imgRef} url={url} scale={[imgW, imgH]} transparent />
        <mesh ref={overlayRef} position={[0, 0, 0.01]}>
          <planeGeometry args={[imgW, imgH]} />
          <meshBasicMaterial color="#000000" transparent opacity={0} />
        </mesh>
      </group>
      <group position={[0, 0, 0.05]}>
        {lines.map((line, i) => (
          <group
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            visible={false}
          >
            <Text
              fontSize={line.fontSize}
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              maxWidth={imgW * 0.85}
              letterSpacing={line.letterSpacing}
              color={line.color}
              outlineWidth={line.outlineWidth ?? 0}
              outlineColor="#000000"
            >
              {line.text}
            </Text>
          </group>
        ))}
      </group>
    </>
  );
}

export default function Slides() {
  const { width } = useThree((state) => state.viewport);
  const step = width;
  const total = slideData.length * step;

  const refs = useRef([]);
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    const onWheel = (e) => {
      target.current += (e.deltaY + e.deltaX) / 650;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useFrame((_, delta) => {
    current.current +=
      (target.current - current.current) * Math.min(1, delta * 4.5);

    refs.current.forEach((slide, i) => {
      if (!slide) return;
      let x = (i * step - current.current * step) % total;
      if (x < 0) x += total;
      if (x > total / 2) x -= total;
      slide.position.x = x;
    });
  });

  return (
    <group>
      {slideData.map((item, i) => (
        <group
          key={item.url}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <Slide {...item} index={i} refs={refs} />
        </group>
      ))}
    </group>
  );
}
