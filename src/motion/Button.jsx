import React from 'react'
import {motion} from 'motion/react'
const Button = () => {
  return (

    // when Hover make it larger
    // when Tap make it smaller
    <motion.button transition={{type:"spring"}} whileTap={{scale:0.95}} whileHover={{scale:1.05}} className='text-4xl bg-gray-400  rounded-md text-white px-4 py-2 cursor-pointer'>
      Start Now
    </motion.button>
  )
}

export default Button
