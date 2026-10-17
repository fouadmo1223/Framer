import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Slides from "./Slides";

export default function Hero() {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <Slides />
      </Suspense>
    </Canvas>
  );
}
