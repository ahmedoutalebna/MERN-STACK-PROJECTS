import React from 'react'
import Header from './component/header/Header'
import './App.css'
import Content from './component/content/Content'
import Signin from './component/sign-in/Signin'
import Signup from './component/sign-up/Signup'
import {Route, Routes} from 'react-router-dom'
import Home from './component/home/Home'
import UserProfile from './component/profile/UserProfile'
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Content />}/>
        <Route path='/signIn' element={<Signin />}/>
        <Route path='/signUp' element={<Signup />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/profile' element={<UserProfile />}/>
      </Routes>
    </div>
  )
}

export default App