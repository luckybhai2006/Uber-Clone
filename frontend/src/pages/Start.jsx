import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div  >
      <div className='bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_vector-1721833865067-e6346760ba31?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dz)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
         <img className='w-20 mb-2 ml-[28px]' src='https://cdn.icon-icons.com/icons2/2407/PNG/512/uber_icon_146079.png'></img>
         <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold ml-7'>Get Started With Uber</h2>
            <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
         </div>
      </div>
    </div>
  )
}

export default Start
