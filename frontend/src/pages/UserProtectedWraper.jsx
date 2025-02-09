import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserProtectedWraper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
const {user, setUser} = useContext(UserDataContext);
const [isLoading, setIsLoding]=useState(true)

// console.log(token)
  useEffect(() => {
    if (!token){
      navigate('/login')
    }
  },[token])

  axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then(response=>{
    if(response.status===200){
      setUser(response.data)
      setIsLoding(false)
    }
  })
  if(isLoading){
    return (
      <div className="flex justify-center items-center h-screen">
  <img className="h-10" src="https://i.gifer.com/ZKZg.gif" alt="Loader" />
</div>

   )
  }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWraper
