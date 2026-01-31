import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ToggleButton = () => {
  const container = useRef(null);

  useGSAP(() => {}, { scope: container });

  return (
    <>
      <section ref={container} className="relative bg-black pt-10 ms-20 ">
        <>
          {/* From Uiverse.io by Private-user-2002 */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" value={true} />
            <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95" />
          </label>
        </>
      </section>
    </>
  );
};

export default ToggleButton;
