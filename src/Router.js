import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Main from './pages/Main'
import Profile from './pages/Profile'
import FindFriend from './pages/FindFriend'
import VideoPage from './pages/VideoPage'
import ErrorPage from './pages/ErrorPage'

const Router = () => {
  let [isHiddenNavbar, setIsHiddenNavbar] = useState()
  let location = useLocation()

  const changeHiddenNavbar = params => {
    if (params === '/login' || params === '/signup' || params === '/videoPage')
      setIsHiddenNavbar(true)
    else setIsHiddenNavbar(false)
  }

  useEffect(() => {
    changeHiddenNavbar(location.pathname)
  }, [location.pathname])

  return (
    <>
      {!isHiddenNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile/*" element={<Profile />} />
        <Route path="findFriend" element={<FindFriend />} />
        <Route path="videoPage" element={<VideoPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default Router
