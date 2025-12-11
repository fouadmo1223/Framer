
import { motion } from "motion/react";
const Drag = () => {
  return (
    <motion.button drag dragConstraints={{left:-10,right:10,top:-10,bottom:10}} className='bg-blue-500 text-white px-4 py-2 rounded hover:cursor-grab'>
      Drag Me
    </motion.button>
  )
}

export default Drag
