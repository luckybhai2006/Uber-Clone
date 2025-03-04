import React from 'react'

const LookingForDriver = (props) => {

   return (
      <div>

         <h5 onClick={() => { props.setLookingForADriver(false), props.setExit(true) }} className='p-1 text-center w-[93%] absolute top-0'>
            <i className="text-3xl opacity-0 text-gray-800 ri-arrow-down-wide-line" />
         </h5>
         <div className='flex space-x-2 justify-center'>
            <span className='sr-only'>Loading...</span>
            <div className='h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-3 w-3 bg-black rounded-full animate-bounce'></div>
         </div>
         <h3 className='text-2xl font-semibold mb-2 mt-5'>Looking for a driver</h3>

         <div className='flex justify-between flex-col items-center'>
            <img className='h-20' src={props.vehicleImage} alt={props.vehicleType} />
            <div className='w-full mt-5'>
               <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className="ri-map-pin-line"></i>
                  <div>
                     <h3 className='text-lg font-medium'>Pickup</h3>
                     <p className='text-sm text-gray-600'>{props.pickUp}</p>
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
         </div>
      </div>
   )
}

export default LookingForDriver
