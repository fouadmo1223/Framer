import React from 'react'
import { motion } from 'motion/react'

const Slide = () => {
  return (
    <motion.div initial={{opacity:0,x:-100}} animate={{opacity:1,x:0}} transition={{duration:1,ease:"easeOut"}}>
      <h1 className='text-3xl'> Slide Component</h1>
    </motion.div>
  )
}

export default Slide