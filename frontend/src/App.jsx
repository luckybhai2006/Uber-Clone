import React from 'react';
import { Route, Routes } from 'react-router-dom';
// ===========================================================
import Start from './pages/Start';
import Home from './pages/Home';
import CaptainHome from './pages/CaptainHome';
// ===========================================================
import UserLogin from './pages/userLogin';
import Riding from './pages/Riding';
import UserSignUp from './pages/UserSignup';
import UserLogout from './pages/UserLogout';
// ===========================================================
import CaptionLogin from './pages/CaptionLogin';
import CaptainRiding from './pages/CaptainRiding';
import CaptionSignUp from './pages/captionSignUp';
import CaptionLogout from './pages/CaptionLogout';
// ==========================ss=================================
import UserProtectedWraper from './pages/UserProtectedWraper';
import CaptainProtectedWraper from './pages/CaptainProtectedWraper';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} /> 
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
