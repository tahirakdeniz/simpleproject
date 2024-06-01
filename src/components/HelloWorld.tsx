'use client'
import React from 'react'

type Props = {}

function HelloWorld({}: Props) {
  const [number, setNumber] = React.useState(0);
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold'>Enginin AQ</h1>
      <span className='text-3xl'>AQ: {number}</span>
      <button onClick={() => setNumber(n => n+1)} className='bg-blue-500 p-2 rounded-md text-white'>Enginin AQ</button>
    </div>
  )
}

export default HelloWorld