import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CaptionLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  //  const [captionData, setCaptionData] = useState({})

  const { setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Login button clicked'); // Add this

    const captainData = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captions/login`, captainData);
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
        toast.success(response.data.message || "Login successful!");
      }
    } catch (error) {
      console.error('Login Failed:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col bg-red-600justify-between">
      <div>
        <img className='w-48 ml-[-28px]' src='https://i.pinimg.com/736x/9e/79/bd/9e79bd2ae97f71e39bc20126a50a0ceb.jpg' />
      </div>

      {/* Centered Form */}
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg w-full max-w-md"
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Enter your password"
          />

          <button className="bg-black text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg">
            Login
          </button>
        </form>
      </div>

      <div c>
        <p className="text-center mb-5">
          Join a fleet?{' '}
          <Link to="/caption-signup" className="text-blue-600">
            Register as a Caption
          </Link>
        </p>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );

}

export default CaptionLogin
