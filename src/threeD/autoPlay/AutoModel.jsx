import { useGLTF, useAnimations } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import { Box3, LoopRepeat, Vector3 } from "three"

// Height the model is normalized to, in world units
const MODEL_HEIGHT = 2.6

useGLTF.preload("/angel.glb")

const AutoModel = () => {
  const group = useRef(null)
  const { scene, animations } = useGLTF("/angel.glb")
  const { actions, names } = useAnimations(animations, group)

  // Scale the model to a known height and center it in front of the camera
  const fit = useMemo(() => {
    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const scale = size.y > 0 ? MODEL_HEIGHT / size.y : 1
    return { scale, offset: center.multiplyScalar(-scale) }
  }, [scene])

  // Start the first clip as soon as the model loads and loop it forever.
  // useAnimations advances the mixer every frame, so nothing else is needed.
  useEffect(() => {
    const action = actions[names[0]]
    if (!action) return

    action.reset().setLoop(LoopRepeat, Infinity).fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5)
    }
  }, [actions, names])

  return (
    <group ref={group} dispose={null}>
      <group position={fit.offset} scale={fit.scale}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export default AutoModel
