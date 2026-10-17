import { Image as DImage } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const urls = [
  "https://images.pexels.com/photos/39886326/pexels-photo-39886326.png",
  "https://images.pexels.com/photos/39957125/pexels-photo-39957125.jpeg",
  "https://images.pexels.com/photos/18523946/pexels-photo-18523946.jpeg",
];

function Slide({ url }) {
  const { width, height } = useThree((state) => state.viewport);

  return <DImage url={url} scale={[width * 0.82, height * 0.82]} />;
}

export default function Slides() {
  const { width } = useThree((state) => state.viewport);
  const step = width;
  const total = urls.length * step;

  const refs = useRef([]);
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    const onWheel = (e) => {
      target.current += (e.deltaY + e.deltaX) / 700;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useFrame((_, delta) => {
    current.current +=
      (target.current - current.current) * Math.min(1, delta * 4);

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
      {urls.map((url, i) => (
        <group
          key={url}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <Slide url={url} />
        </group>
      ))}
    </group>
  );
}
