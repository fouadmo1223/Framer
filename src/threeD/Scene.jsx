import {Canvas,useThree} from "@react-three/fiber" 
import { Suspense } from "react"
import { DirectionalLight } from "three"
import Model from "./Model"

export default function Scene (){

    return(
        <Canvas>
            <DirectionalLight position={[-5,-5,5]} intensity={4} />
            <Suspense>
                <Model />
            </Suspense>
        </Canvas>
    )

}