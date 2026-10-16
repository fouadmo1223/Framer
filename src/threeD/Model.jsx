import { useGLTF, useAnimations } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { Box3, MathUtils, Vector3 } from "three"

// Height the model is normalized to, in world units
const MODEL_HEIGHT = 2.6

useGLTF.preload("/angel.glb")

const getScrollProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  if (max <= 0) return 0
  return MathUtils.clamp(window.scrollY / max, 0, 1)
}

const Model = () => {
  const group = useRef(null)
  const target = useRef(0) // raw scroll progress
  const smooth = useRef(0) // damped progress used for animation
  const { scene, animations } = useGLTF("/angel.glb")
  const { actions, mixer } = useAnimations(animations, group)
  const clip = animations[0]

  // Scale the model to a known height and center it on the origin, so the
  // scroll rotation spins it in place instead of swinging it out of view.
  const fit = useMemo(() => {
    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const scale = size.y > 0 ? MODEL_HEIGHT / size.y : 1
    return { scale, offset: center.multiplyScalar(-scale) }
  }, [scene])

  useEffect(() => {
    const onScroll = () => {
      target.current = getScrollProgress()
    }
    onScroll()
    smooth.current = target.current
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    // Play the clip but keep it paused: scroll is the only thing that moves its time.
    const action = clip ? actions[clip.name] : null
    if (action) {
      action.reset().play()
      action.paused = true
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      mixer.stopAllAction()
    }
  }, [actions, clip, mixer])

  useFrame((_, delta) => {
    // Frame-rate independent smoothing toward the scroll position
    smooth.current = MathUtils.damp(smooth.current, target.current, 6, delta)
    const p = smooth.current

    if (group.current) {
      group.current.rotation.y = p * Math.PI * 2
      group.current.position.y = Math.sin(p * Math.PI) * 0.3
      group.current.scale.setScalar(0.9 + p * 0.2)
    }

    const action = clip ? actions[clip.name] : null
    if (action) {
      // Stay just under the end so the clip never wraps/clamps oddly
      action.time = p * clip.duration * 0.999
      mixer.update(0) // apply pose at this time without advancing it
    }
  })

  return (
    <group ref={group} dispose={null}>
      <group position={fit.offset} scale={fit.scale}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export default Model
