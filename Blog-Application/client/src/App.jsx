import React, { useState, useContext } from 'react'
import Header from './header/Header'
import Home from './home/Home'
import SinglePost from './singlePosts/SinglePost'
import Write from './write/Write'
import Settings from './settings/Settings'
import Navbar from './navbar/Navbar'
import Register from './register/Register'
import Login from './register/Login'
import './App.css'
import { Routes, Route, Outlet } from "react-router-dom";
import Posts from './posts/Posts'
import Postcard from './posts/post-card/Postcard'
import { Context } from './context/Context'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const {user} = useContext(Context)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' Component={Home}/>
        <Route
          path="/settings"
          element={
            user ? <Settings /> : <Login/>
          }
        />
        <Route path='/post/:postId' Component={SinglePost} />
        <Route 
          path='/write' 
          element={
            user ?
            <Write />
            :
            <Login />
          }
        />

        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
      </Routes>
    </>
  )
}

export default App