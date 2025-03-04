import React from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { useEffect } from 'react'
import {SocketContext} from '../context/SocketContext'
import {useNavigate} from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
const Riding = () => {
   const location = useLocation()
   const {ride} = location.state || {}
   const {socket} = React.useContext(SocketContext)
   const navigate = useNavigate()


   socket.on('ride-finished', ride => {
      navigate('/home')
  })
   return (
      <div className="h-screen relative">

         <div className="h-1/2">
         
           <LiveTracking/>
         </div>
         <Link to="/home" className='fixed left-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
  <i className='text-lg font-medium ri-home-5-line'></i>
</Link>
         <div className="h-1/2 p-4">
            <div className='flex items-center justify-between'>
               <img className='h-20 ml-6' src="https://purepng.com/public/uploads/large/purepng.com-honda-carshondacarshonda-manufacturingvehicle-honda-1701527486181k3is7.png" alt="" />
               <div className='text-right'>
                  <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
                  <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                  <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
               </div>
            </div>
            <div className='gap-2 flex justify-between flex-col items-center'>
               <div className='w-full mt-5'>
                  <div className='flex items-center gap-5 p-3 border-b-2'>
                     <i className="text-lg ri-map-pin-2-fill"></i>
                     <div>
                        <h3 className='text-lg font-medium'>Pickup</h3>
                        <p className='text-sm mt-1 text-gray-600'>{ride?.pickup}</p>
                     </div>
                  </div>
                  <div className='flex items-center gap-5 p-3 border-b-2'>
                     <i className="text-lg ri-map-pin-2-fill"></i>
                     <div>
                        <h3 className='text-lg font-medium'>Destination</h3>
                        <p className='text-sm mt-1 text-gray-600'>{ride?.destination}</p>
                     </div>
                  </div>
                  <div className='flex items-center gap-5 p-3'>
                     <i className="ri-bank-card-line"></i>
                     <div>
                        <h3 className='text-lg font-medium'>₹{Math.round(ride?.fair)}</h3>
                        <p className='text-sm mt-1 text-gray-600'>Cash Cash</p>
                     </div>
                  </div>
               </div>
            </div>
            <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
         </div>
      </div>
   )}
export default Riding