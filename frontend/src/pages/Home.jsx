import React, { useRef, useState, useEffect,useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import LocationPannel from '../components/locationPannel'
import 'remixicon/fonts/remixicon.css'
import VehicalPannel from '../components/VehicalPannel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { Link } from 'react-router-dom'
import {SocketContext} from '../context/SocketContext'
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
import { toast } from 'react-toastify'

const Home = () => {
  const [fare, setFare] = useState(null)
  const [pickUp, setPickUp] = useState('')
  const [Destination, setdestination] = useState('')
  const [pannelOpen, setpannelOpen] = useState(false)
  const [vehicalPanel, setVehicalPanel] = useState(false)
  const [confirmRide, setConfirmRide] = useState(false)
  const [LookingForADriver, setLookingForADriver] = useState(false)
  const [WaitiingForADriver, setWaitiingForADriver] = useState(false)
  const [exit, setExit] = useState(true)
  const [ride, setRide] = useState(null)
  const [VehicalType, setVehicalType] = useState(" ")
  const [vehicleImage, setVehicleImage] = useState("");

  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState('')

  const pannelRef = useRef(null)
  const pannelCloseRef = useRef(null)
  const vehicalPannelReff = useRef(null)
  const ConsfirmRideReff = useRef(null)
  const LookingForDriverReff = useRef(null)
  const WaitiingForADriverReff = useRef(null)
  const Exit = useRef(null)

  const navigate = useNavigate()

  const {socket} = useContext(SocketContext)
  const {user} = useContext(UserDataContext)

  useEffect(() => {
    // console.log('User:', user)
    socket.emit('join', {userType: 'user', userId:user._id })
  },[])

  socket.on('ride-confirmed', ride => {
    setLookingForADriver(false)
    setWaitiingForADriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitiingForADriver(false)
    // console.log('Ride-started')
    navigate('/riding', {state: {ride}})
  })


  const handlePickupChange = async (e) => {
    setPickUp(e.target.value)
    setFare(null)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      setPickupSuggestions(response.data.suggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error.response.data)
    }
  }
  const handleDestinationChange = async (e) => {
    setdestination(e.target.value)
    setFare(null)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      setDestinationSuggestions(response.data.suggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }


  const vehicleImages = {
    car: "https://purepng.com/public/uploads/large/purepng.com-honda-carshondacarshonda-manufacturingvehicle-honda-1701527486181k3is7.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
  };

  const handleVehicleSelect = (type) => {
    setVehicalType(type);
    setVehicleImage(vehicleImages[type]);  // Set the corresponding vehicle image
  };



  useGSAP(() => {
    gsap.to(pannelRef.current, {
      height: pannelOpen ? '70%' : '0%',
      padding: pannelOpen ? 24 : 1,
    });
    gsap.to(pannelCloseRef.current, {
      opacity: pannelOpen ? 1 : 0,
      pointerEvents: pannelOpen ? 'all' : 'none',
    });
  }, [pannelOpen]);

  useGSAP(() => {
    if (vehicalPanel) {
      gsap.to(vehicalPannelReff.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicalPannelReff.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalPanel])

  useGSAP(() => {
    if (confirmRide && pickUp.length < 130 && Destination.length < 130) {
      gsap.to(ConsfirmRideReff.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(ConsfirmRideReff.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [confirmRide, pickUp, Destination]);
  
  useGSAP(() => {
    // Check if LookingForADriver is true and input length is within the limit
    if (LookingForADriver && pickUp.length < 130 && Destination.length < 130) {
      gsap.to(LookingForDriverReff.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(LookingForDriverReff.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [LookingForADriver, pickUp, Destination]);

  useGSAP(() => {
    if (WaitiingForADriver) {
      gsap.to(WaitiingForADriverReff.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(WaitiingForADriverReff.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [WaitiingForADriver])

  useGSAP(() => {
    gsap.to(Exit.current, {
      opacity: exit ? 1 : 0,
      pointerEvents: exit ? 'all' : 'none',
    });
  }, [exit]);


  async function findTrip() {
    try {
      setVehicalPanel(true);
      setpannelOpen(false);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare?pickup=${pickUp}&destination=${Destination}`, {
        // params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Fare Details:',response.data.fair);
      setFare(response.data.fair);
    } catch (error) {
      console.error('Error fetching fare:', error.response?.data || error.message);
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup: pickUp,
          destination: Destination,
          vehicleType: VehicalType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      // Log the response data on success
      console.log('Ride created:', response.data.ride);
      // Optionally show a success notification
      toast.success("Ride created successfully!");
    } catch (error) {
      toast.error("No Captions found");
    }
  }
  
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Back ground Image */}
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>
      <img className="w-16 absolute left-5 top-5"
        src="https://cdn.icon-icons.com/icons2/2407/PNG/512/uber_icon_146079.png"
        alt="Uber Icon" />
      {/* Main Overlay */}
      <div className="absolute justify-end top-0 w-full h-screen flex flex-col">
        {/* Top Section (30% height) */}
        <div className="h-[30%] border-t-4 border-black bg-white p-6 relative">
          <h5 className='absolute right-6 opacity-0 top-6 text-2xl'
            onClick={() => { setpannelOpen(false), setExit(true) }} ref={pannelCloseRef}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <Link ref={Exit} to="/user/logout" className='fixed right-3 top-16 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-medium ri-logout-box-line'></i>
          </Link>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form onSubmit={submitHandler}>
            <div className="relative flex flex-col gap-3 mt-5">
              <div className="absolute left-4 bg-gray-900 w-1" style={{ height: '35%', top: '15%' }}></div>
              <div className="absolute left-3 top-[9%] w-3 h-3 border-2 border-gray-700 rounded-full bg-white"></div>
              <div className="absolute left-3 top-[47%] w-3 h-3 border-2 border-gray-900 bg-white"></div>
              <input
                className="bg-[#eee] px-12 py-2 border-2 border-gray-400 text-lg rounded-lg w-full pl-10"
                type="text"
                placeholder="Add a pick-up location"
                value={pickUp}
                onClick={() => {
                  setpannelOpen(true);
                  setExit(false);
                  setActiveField('pickup');
                }}
                onChange={handlePickupChange}
              />
              <input
                className="bg-[#eee] border-2 border-gray-400 px-12 py-2 text-lg rounded-lg w-full pl-10"
                type="text"
                placeholder="Add a drop location"
                onClick={() => {
                  setpannelOpen(true);
                  setExit(false);
                  setActiveField('destination');
                }}
                value={Destination}
                onChange={handleDestinationChange}
              />
              <button onClick={findTrip} className='bg-black text-white border-2 border-gray-400 px-12 mt-2 py-2 text-lg rounded-lg w-full'>
                Find Ride
              </button>

            </div>
          </form>
        </div>
        <div ref={pannelRef} className="h-0 bg-white">
          <LocationPannel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            // setpannelOpen={setpannelOpen}
            // setVehicalPanel={setVehicalPanel}
            setPickUp={setPickUp}
            setdestination={setdestination}
            activeField={activeField}
          />
        </div>
      </div>
      {/* vehical pannel */}
      <div ref={vehicalPannelReff} className='fixed w-full border-t-4 border-black z-10 bottom-0 translate-y-full bg-white p-3 py-14 px-3 pt-14'>
        <VehicalPannel fare={fare} setVehicalPanel={setVehicalPanel} setFare={setFare} setVehicalType={setVehicalType}  setConfirmRide={setConfirmRide} onVehicleSelect={handleVehicleSelect} />
      </div>
      <div ref={ConsfirmRideReff} className='fixed border-t-4 border-black w-full z-10 bottom-0 translate-y-full bg-white p-3 py-5 px-3 pt-6'>
  <ConfirmRide
    createRide={createRide}
    pickUp={pickUp}
    fare={fare}
    confirmRide={confirmRide}
    Destination={Destination}
    setConfirmRide={setConfirmRide}
    setLookingForADriver={setLookingForADriver}
    VehicalType={VehicalType}
    vehicleImage={vehicleImage}
  />
</div>
<div ref={LookingForDriverReff} className='fixed border-t-4 border-black w-full z-10 bottom-0 translate-y-full bg-white p-3 py-12 px-3 pt-8'>
  <LookingForDriver
    LookingForDriver={LookingForDriver}
    setExit={setExit}
    pickUp={pickUp}
    VehicalType={VehicalType}
    // vehicalType={VehicalType}
    vehicleImage={vehicleImage}
    fare={fare}
    Destination={Destination}
    setLookingForADriver={setLookingForADriver}
  />
</div>
      <div ref={WaitiingForADriverReff} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-14 px-3 pt-14'>
        <WaitingForDriver ride={ride} VehicalType={VehicalType}
    vehicleImage={vehicleImage} setWaitiingForADriver={setWaitiingForADriver} />
      </div>
    </div>
  )
}

export default Home