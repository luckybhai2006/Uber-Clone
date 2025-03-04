import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FinishRide = (props) => {

   const navigate = useNavigate()

   async function finishRide (){
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/finish-ride`,{
            rideId: props.ride._id

   },{
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`
      }
   })
   if(res.status === 200){
      props.setFinisRide(false)
      // props.setRidePopPAnel(false)
      navigate('/captain-home')
      toast.success("Ride finished successfully.");
   }
}
  return (
   <div>
         <h5 className='p-1 text-center w-[93%] absolute top-0'
            onClick={() => {
               props.setFinisRide(false)
            }}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
         </h5>
         <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

         <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
               <img className="h-10 w-10 rounded-full" src="https://photosbulk.com/wp-content/uploads/2024/08/aesthetic-girl-pic_67.webp" alt="" />
               <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
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
            <div className="mt- w-full">
                  <button onClick={finishRide}
                     className="w-full mt-5 bg-green-600 text-white font-semibold py-3 text-center rounded-lg block"
                  >
                     Finish Ride
                  </button>
            </div>
         </div>
      </div>
  )
}

export default FinishRide
