import React, { useState } from 'react'

const Like = () => {
    const [liked,setLiked] = useState(false);
    const [counter,setCounter] = useState(0);
    const handelClick = () => {
        if(liked){
            setCounter((prev) => prev - 1)
        }else{
            setCounter((prev) => prev + 1)
        }
        setLiked((prev) => (!prev))
    }

  return (
    <div>
      

    <div className='text-white p-10 mx-auto mt-20 text-4xl' onClick={handelClick}>
        {liked ? 'Unlike' : 'Like'}
    </div>

    <span className='text-white text-4xl'>{counter}</span>

    </div>
  )
}

export default Like



