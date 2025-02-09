import React, { useRef, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

   const [finishRide, setFinishRide] = useState(false)
   const FinishRideReff = useRef(null)
   const location = useLocation()
   const ride = location.state?.ride


   useGSAP(() => {
      if (finishRide) {
        gsap.to(FinishRideReff.current, {
          transform: 'translateY(0)'
        })
      } else {
        gsap.to(FinishRideReff.current, {
          transform: 'translateY(100%)'
        })
      }
    }, [finishRide])

   return (
      <div className="h-screen relative">
         <div className='fixed top-0 p-6 items-center justify-between w-screen overflow-hidden'>
            <img className='w-16' src="https://cdn.icon-icons.com/icons2/2407/PNG/512/uber_icon_146079.png" alt="" />
            <Link to="/captain-home" className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
               <i className="ri-logout-box-r-line"></i>
            </Link>
         </div>
         <div className="h-4/5">
            <LiveTracking/>
         </div>
         <div className='h-1/5 p-6 flex items-center relative justify-between bg-yellow-400' onClick={()=>{
            setFinishRide(true)
            }}>
            <h5 className='p-1 text-center w-[90%] absolute top-3'>
               <i className="text-3xl text-gray-800 ri-arrow-up-wide-line" />
            </h5>
            <h4 className='text-xl font-semibold'>{"4 km away"}</h4>
            <button className='bg-green-600 p-3 px-10 text-white font-semibold p-2 rounded-lg'>Complete Ride</button>
         </div>
         <div ref={FinishRideReff} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-14 px-3 pt-14'>
            <FinishRide
            ride={ride} 
            setFinisRide={setFinishRide}/>
         </div>
      </div>
   )
}

export default CaptainRiding
