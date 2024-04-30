import React from 'react'
import './content.css'
import { useNavigate } from 'react-router-dom'
const Content = () => {
  const navigate = useNavigate()
  const handleSignIn = ()=>{
    navigate('/signIn')
  }
  const handleSignUp = ()=>{
    navigate('/signUp')
  }
  return (
    <div className='content-card'>
        <h1>MERN AUTHENTICATION </h1>
        <p>
            this is a boilerplart for Mern Authentication that stores a jwt in <br />
            an HTTP-only cookie. it also uses Redux toolkit
        </p>
        <div className="buttons">
            <button className='signIn' onClick={handleSignIn}> Sign in </button>
            <button className="signUp" onClick={handleSignUp}> Sign up </button>
        </div>
    </div>
  )
}

export default Content