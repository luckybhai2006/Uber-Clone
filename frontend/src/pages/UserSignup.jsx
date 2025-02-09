import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';
const UserSignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    const { user, setUser } = React.useContext(UserDataContext)

    const onSubmitHandler = async (e) => {
      e.preventDefault();

      // from this line of code we store all data of user in setUser
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email: email,
        password: password,
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if (response.status === 201) {
        const data = response.data

        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/login')
      }

      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-48 mb-9 ml-[-28px]' src='https://i.pinimg.com/736x/9e/79/bd/9e79bd2ae97f71e39bc20126a50a0ceb.jpg' />
          <form onSubmit={(e) => {
            onSubmitHandler(e)
          }}>

            <h3 className='text-lg font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-6'>
              <input
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 bprder text-lg placeholder:text-sm'
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                type='text'
                placeholder='Firstname'
              />
              <input
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm'
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                type='text'
                placeholder='Lastname'
              />
            </div>

            <h3 className='text-lg font-medium mb-6'>What's your email</h3>
            <input
              className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type='email'
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-6'>Enter Password</h3>

            <input
              className='bg-[#eeeeee] mb-12 rounded px-4 py-2 w-full text-lg placeholder:text-base'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type='password'
              placeholder='Enter your password'
            />

            <button className='bg-black text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg'>Register</button>

          </form>
          <p className='text-center'>Alredy have a account?<Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>


        <div>
          <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided</p>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp
