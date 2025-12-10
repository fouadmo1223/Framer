import React from 'react'
import { motion } from 'motion/react'

const FadeIn = () => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:3}}>
      <h1 className='text-3xl'> FadeIn Component</h1>
    </motion.div>
  )
}

export default FadeIn
