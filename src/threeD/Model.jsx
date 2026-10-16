import { useGLTF } from "@react-three/drei"
const gltf = useGLTF("/angel.glb")
const Model = () => {
  return (
    <group>
        <primitive />
    </group>
  )
}

export default Model
