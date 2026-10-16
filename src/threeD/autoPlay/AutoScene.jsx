import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Environment, OrbitControls, useProgress } from "@react-three/drei"
import AutoModel from "./AutoModel"

function Loader() {
  const { active, progress } = useProgress()
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-white transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-lg font-medium">Loading model…</div>
      <div className="text-sm opacity-70">{progress.toFixed(0)}%</div>
    </div>
  )
}

export default function AutoScene() {
  return (
    <div className="fixed inset-0 h-screen w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }} shadows>
        <color attach="background" args={["#111418"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[-5, 5, 5]} intensity={4} castShadow />
        <spotLight position={[5, 8, 5]} angle={0.4} penumbra={1} intensity={5} />
        <Suspense fallback={null}>
          <AutoModel />
          <Environment preset="city" />
        </Suspense>
        {/* Drag to look around the character (left/right), no zoom */}
        <OrbitControls
          makeDefault
          target={[0, 0, 0]}
          enablePan={false}
          enableZoom={false}
          enableDamping
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
      <Loader />
    </div>
  )
}
