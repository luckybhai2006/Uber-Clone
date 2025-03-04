import React from 'react'
// import { useEffect } from 'react'
const ConfirmRide = (props) => {

   return (
      <div >
         <h5 className='p-1 text-center w-[93%] absolute top-0'
            onClick={() => {
               props.setConfirmRide(false)
            }}>
            <i className="text-3xl text-gray-800 ri-arrow-down-wide-line" />
         </h5>
         <h3 className='text-2xl font-semibold mb-3 mt-4'>Confirm Your Ride</h3>

         <div className='gap-2 flex justify-between flex-col items-center'>
            <img className='h-20' src={props.vehicleImage} alt={props.vehicleType} />
            <div className='w-full mt-5'>
               <div className='flex items-center gap-5 p-3 border-b-2'>
               <i className="ri-map-pin-line"></i>
                  <div>
                     <h3 className='text-lg font-medium'>Pickup</h3>
                     <p className='text-sm mt- text-gray-600'>{props.pickUp}</p>
                  </div>
               </div>
               <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className="text-lg ri-map-pin-2-fill"></i>
                  <div>
                     <h3 className='text-lg font-medium'>Destination</h3>
                     <p className='text-sm mt- text-gray-600'>{props.Destination}</p>
                  </div>
               </div>
               <div className='flex items-center gap-5 p-3'>
               <i className="ri-bank-card-line"></i>
                  <div>
                     <h3 className='text-lg font-medium'>₹{Math.round(props.fare?.[props.VehicalType])}</h3>
                     <p className='text-sm mt- text-gray-600'>Cash Cash</p>
                  </div>
               </div>
            </div>
            <button onClick={() => {
               props.createRide()
               props.setLookingForADriver(true)
               props.setConfirmRide(false)
            }} className='w-full mt- bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm
            </button>
         </div>
      </div>
   )
}

export default ConfirmRide
