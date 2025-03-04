import React from 'react';
import { Route, Routes } from 'react-router-dom';
// ===========================================================
import Start from './pages/Start';
import Home from './pages/Home';
import CaptainHome from './pages/CaptainHome';
// ===========================================================
import UserLogin from './pages/UserLogin';
import Riding from './pages/Riding';
import UserSignUp from './pages/UserSignup';
import UserLogout from './pages/UserLogout';
// ===========================================================
import CaptionLogin from './pages/CaptionLogin';
import CaptainRiding from './pages/CaptainRiding';
import CaptionSignUp from './pages/CaptionSignUp';
import CaptionLogout from './pages/CaptionLogout';
// ==========================ss=================================
import UserProtectedWraper from './pages/UserProtectedWraper';
import CaptainProtectedWraper from './pages/CaptainProtectedWraper';

import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <div>
       <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        
        <Route path='/' element={<Start />} />
        <Route path='/riding' element={<Riding />} /> 
        <Route path='/login' element={<UserLogin />} />
        <Route path='/captain-riding' element={<CaptainRiding />} /> 
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/captain-login' element={<CaptionLogin />} />
        <Route path='/caption-signup' element={<CaptionSignUp />} />
        <Route path='/home' element={
          <UserProtectedWraper>
            <Home />
          </UserProtectedWraper>
        } />
        <Route path='/user/logout' element={
          <UserProtectedWraper>
            <UserLogout />
          </UserProtectedWraper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectedWraper>
            <CaptainHome />
          </CaptainProtectedWraper>
        } />
        <Route path='/captain/logout' element={
          <CaptainProtectedWraper>
            <CaptionLogout />
          </CaptainProtectedWraper>
        } />
      </Routes>
    </div>
  )
}

export default App
