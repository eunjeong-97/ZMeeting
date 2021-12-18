import React, { useState } from 'react'
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Main from './pages/Main'
import Profile from './pages/Profile'
import FindFriend from './pages/FindFriend'
import VideoPage from './pages/VideoPage'
import Error from './pages/Error'

const Router = () => {
  let [isHiddenNavbar, setIsHiddenNavbar] = useState(false)

  const changeHiddenNavbar = props => {
    setIsHiddenNavbar(props)
  }

  console.log(isHiddenNavbar)
  return (
    <Routers>
      {!isHiddenNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="login"
          element={() => <Login isNavbarHidden={changeHiddenNavbar(true)} />}
        />
        <Route
          path="signup"
          render={() => <Signup isNavbarHidden={changeHiddenNavbar(true)} />}
          element={<Signup />}
        />
        <Route path="profile/*" element={<Profile />} />
        <Route path="findFriend" element={<FindFriend />} />
        <Route
          path="videoPage"
          render={() => <VideoPage isNavbarHidden={changeHiddenNavbar(true)} />}
        />
        <Route
          path="*"
          render={() => <Error isNavbarHidden={changeHiddenNavbar(true)} />}
        />
      </Routes>
    </Routers>
  )
}

export default Router
