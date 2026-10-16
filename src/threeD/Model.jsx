import { useGLTF } from "@react-three/drei"

import { useRef } from "react"

 useGLTF.preload("/angel.glb")
const Model = () => {
 const group = useRef(null)   
 const {nodes,materials,animations,scene} = useGLTF("/angel.glb")
  return (
    <group ref={group} object={scene} >
        <primitive />
    </group>
  )
}

export default Model
