import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userData, setUserData] = useState({});

  const {user, setUser} = useContext(UserDataContext)
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const userData = {
      email:email,
      password:password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justifyy-between">
      <div>
      <img className='w-48 ml-[-28px]' src='https://i.pinimg.com/736x/9e/79/bd/9e79bd2ae97f71e39bc20126a50a0ceb.jpg' />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md"
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-black text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg">
            Login
          </button>
        </form>
      </div>
      {/* Footer */}
      <div>
        <p className="text-center mb-5">
          New here?
          <Link to="/signup" className="text-blue-600">
            Create New Account
          </Link>
        </p>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg"
        >
          Sign in as Caption
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
