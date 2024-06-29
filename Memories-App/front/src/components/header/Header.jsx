import React, { useState, useContext, useEffect } from 'react'
import menWoman from '../../assets/menWoman.jpg'
import { useNavigate } from 'react-router-dom'
import './header.css'
import { Context } from '../context/Context'
import profileImage from '../../assets/me.jpeg'
const Header = () => {
  const { user, dispatch } = useContext(Context)
  const [token, setToken] = useState(user)
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(user)
  }, [user])
  const handleUserProfile = async () => {
    navigate('/login')
  }
  const handleLogoutUser = async () =>{
    dispatch({type: 'LOGIN_FAILURE'})
    localStorage.removeItem('user')
  }
  return (
    <div className='header-container'>
      <div className="title-image">
        <h1>Memories</h1>
        <img src={menWoman} alt="" />
      </div>

          <div className="user-profile">
            {

              user?(
                  <div className="testing">
                    <img src={profileImage} alt="" onClick={handleUserProfile}/>
                    <button onClick={handleLogoutUser}>Logout</button>
                  </div>
                )
                :
                (
                    <div className="inactiveUser" onClick={handleUserProfile}>
                      <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="" />
                      <span>Login</span>
                    </div>
                )
            }
          </div>
       


    </div>
  )
}
export default Header
