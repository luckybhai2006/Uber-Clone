 import React from 'react'

const RidePopUp = (props) => {
   return (
      <div>
         <h5 className='p-1 text-center w-[93%] absolute top-0'
            onClick={() => {
               props.setRidePopUpPanel(false)
            }}> 
            <i className="text-3xl text-gray-800 ri-arrow-down-wide-line" />
         </h5>
         <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>

         <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
               <img className="h-10 w-10 rounded-full" src="https://photosbulk.com/wp-content/uploads/2024/08/aesthetic-girl-pic_67.webp" alt="" />
               <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+ ' ' + props.ride?.user.fullname.lastname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>{props.ride?.distance}</h5>
         </div>

         <div className='gap-2 flex justify-between flex-col items-center'>
            <div className='w-full mt-5'>
               <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className="ri-map-pin-line"></i>
                  <div>
                     <h3 className='text-lg font-medium'>Pickup</h3>
                     <p className='text-sm mt-1 text-gray-600'>{props.ride?.pickup}</p>
                  </div>
               </div>
               <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className="text-lg ri-map-pin-2-fill"></i>
                  <div>
                     <h3 className='text-lg font-medium'>Destination</h3>
                     <p className='text-sm mt-1 text-gray-600'>{props.ride?.destination}</p>
                  </div>
               </div>
               <div className='flex items-center gap-5 p-3'>
                  <i className="ri-bank-card-line"></i>
                  <div>
                     <h3 className='text-lg font-medium'>₹{Math.round(props.ride?.fair)}</h3>
                     <p className='text-sm mt-1 text-gray-600'>Cash Cash</p>
                  </div>
               </div>
            </div> 
            <div className='flex mt-5 w-full items-center justify-between'>

            <button onClick={() => {
               props.setRidePopUpPanel(false)
            }} className=' bg-gray-300 w-[48%] text-gray-700 p-3 px-10 font-semibold rounded-lg'>Ignore</button>
            <button onClick={() => {
               props.setConfirmRidePopUpPanel(true)
               props.setRidePopUpPanel(false)
               props.confirmRide()
            }} className='bg-green-600 p-3 w-[48%] px-10 text-white font-semibold rounded-lg'>Accept</button>

            </div>
         </div>
      </div>
   )
}

export default RidePopUp
