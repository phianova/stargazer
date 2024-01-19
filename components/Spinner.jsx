import React from 'react'
import spinner from "../public/spinner.gif"
import Image from 'next/image'

const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
        <Image className="w-[200px] m-auto block" src={spinner} alt="loading..."/>
    </div>

      )
}

export default Spinner