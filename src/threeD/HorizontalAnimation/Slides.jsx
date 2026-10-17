
import { Image as DImage } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";

function DreiImage(props) {
  const ref = useRef(null);
  const group = useRef(null);

  return (
    <group ref={group}>
      <DImage  {...props} ref={ref} />
    </group>
  );
}

function Slide({ urls = [], ...props }) {
  const ref = useRef(null);
  const {width} = useThree((state) => state.viewport);

  return (
    <group {...props}>
      <DImage position={[0, 0, 0]} scale={[5, 7]} urls={urls[0]} />
      <DImage position={[0, 0, 0]} scale={[5, 7]} urls={urls[1]} />
      <DImage position={[0, 0, 0]} scale={[5, 7]} urls={urls[2]} />
    </group>
  );
}

export default function Slides (){
    const urls = [
  "https://images.pexels.com/photos/39886326/pexels-photo-39886326.png",
  "https://images.pexels.com/photos/39957125/pexels-photo-39957125.jpeg",
  "https://images.pexels.com/photos/18523946/pexels-photo-18523946.jpeg",
 
];



    return (
      <div>
        <Slide position={[0, 0, 0]} urls={urls} />
        <Slide position={[1, 0, 0]} urls={urls} />
      </div>
    );

}