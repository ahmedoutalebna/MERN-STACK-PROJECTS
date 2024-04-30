import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import './navbar.css'
import { Context } from '../context/Context'
const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {user, dispatch} = useContext(Context)
  let loggedIn = location?.state?.loggedIn 

  const handleSettings = ()=>{
    navigate('/settings', {state: {loggedIn: loggedIn}})
  }
  const handleWrite = ()=>{
    navigate('/write')
  }
  const goHome = ()=>{
    navigate('/', {state: {loggedIn: loggedIn}})
  }
  const handleLogOut = ()=>{
    navigate('/')
    dispatch({type: 'LOGIN_FAILURE'})
  }
  const handleRegistration = ()=>{
    navigate('/register')
  }
  const handleLogIn = ()=>{
    navigate('/login')
  }
  return (
    <div className='nav-container'>
        <div className="left-part">
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-pinterest"></i>
        </div>
        <div className="center-part">
            <ul>
                <li onClick={goHome}>HOME</li>
                <li>ABOUT</li>
                <li>CONTACT</li>
                <li onClick={handleWrite}>WRITE</li>
                {
                  user ?
                  (
                    <li onClick={handleLogOut}>LOGOUT</li>
                  )
                  :
                  (
                    <li onClick={handleLogIn}>LOGIN</li>
                  )
}
     
            </ul>
        </div>
        <div className="right-part">
            {
              user ? 
              (
                  <img src={user.profilePicture} alt="" onClick={handleSettings}/>
              )
              :
              (
                <ul class='login-register'>
                  <li onClick={handleLogOut}>Login</li>
                  <li onClick={handleRegistration}>Register</li>
                </ul>
              )
            }
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>


    </div>
  )
}

export default Navbar