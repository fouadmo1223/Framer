import {Canvas,useThree} from "@react-three/fiber" 
import { DirectionalLight } from "three"

export default function Scene (){

    return(
        <Canvas>
            <DirectionalLight position={[-5,-5,5]} intensity={4} />
        </Canvas>
    )

}