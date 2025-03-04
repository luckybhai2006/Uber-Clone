import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
const PopUpPanelReff = useRef(null)
const ConfirmRidePopUpReff = useRef(null)
const [ ride, setRide ] = useState(null)

const { socket } = useContext(SocketContext)
const { captain } = useContext(CaptainDataContext)

useEffect(() => {
  socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
  })
  const updateLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {

              socket.emit('update-location-captain', {
                  userId: captain._id,
                  location: {
                      ltd: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              })
          })
      }
  }

  // const locationInterval = setInterval(updateLocation, 10000)
  updateLocation()

  // return () => clearInterval(locationInterval)
}, [])

socket.on('new-ride', (data) => {
  // console.log('New Ride:', data)
  setRide(data)
  setRidePopUpPanel(true)
})

async function confirmRide() { 
  console.log(ride)
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

    rideId: ride._id,
    captainId: captain._id,
    // status: 'accepted'
},{
  headers:{
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
})
setRidePopUpPanel(false)
setConfirmRidePopUpPanel(true)
}

useGSAP(() => {
  if (ridePopUpPanel) {
    gsap.to(PopUpPanelReff.current, {
      transform: 'translateY(0)'
    })
  } else {
    gsap.to(PopUpPanelReff.current, {
      transform: 'translateY(100%)'
    })
  }
},[ridePopUpPanel])

useGSAP(() => {
  if (ConfirmRidePopUpPanel) {
    gsap.to(ConfirmRidePopUpReff.current, {
      transform: 'translateY(0)'
    })
  } else {
    gsap.to(ConfirmRidePopUpReff.current, {
      transform: 'translateY(100%)'
    })
  }
}, [ConfirmRidePopUpPanel])
return (
  <div className="h-screen relative">
    <div className="h-[75%] relative">
      <LiveTracking />
      <img 
        className='w-16 absolute top-5 left-5' 
        src="https://freelogopng.com/images/all_img/1659761297uber-icon.png" 
        alt="Uber Icon" 
      />
    </div>
    <Link 
      to="/captain/logout" 
      className='fixed right-2 top-16 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
      <i className="ri-logout-box-r-line"></i>
    </Link>
    <div className="h-2/2 border-t-4 border-black p-6">
      <CaptainDetails />
    </div>
    <div ref={PopUpPanelReff} className="fixed border-t-4 border-black w-full z-10 bottom-0 bg-white translate-y-full p-3 py-10 px-3 pt-12">
      <RidePopUp 
        setRidePopUpPanel={setRidePopUpPanel} 
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
        confirmRide={confirmRide} 
        ride={ride}
      />
    </div>
    <div ref={ConfirmRidePopUpReff} className="fixed border-t-4 border-black h-screen w-full z-10 bottom-0 translate-y-full bg-white p-3 py-10 px-3 pt-12">
      <ConfirmRidePopUp 
        setRidePopUpPanel={setRidePopUpPanel} 
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
        ride={ride}
      />
    </div>
  </div>
)
}

export default CaptainHome
