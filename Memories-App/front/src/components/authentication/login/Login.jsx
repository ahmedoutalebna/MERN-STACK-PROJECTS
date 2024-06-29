import React, {useEffect, useState, useContext} from 'react'
import './login.css'
import axios from 'axios'
import { Context } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
const Login = (e)=>{
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const {user, error, isFetching, dispatch} = useContext(Context)
    const authentication = async(e)=>{
        e.preventDefault()
        const data = {
            email: userEmail,
            password: userPassword
        }
        dispatch({type: 'LOGIN_START'})
        try
        {
            const res = await axios.post('http://localhost:5500/user/login', data)
            if(res.data)
            {
                dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
                navigate('/')
            }
        }
        catch(err)
        {
            console.error(err)
            dispatch({type: 'LOGIN_FAILURE'})
        }
    }

    const handleRegister = async(e)=>{
        e.preventDefault()
        console.log('... register routing')
        navigate('/register')
    }
  return (
    <div className="login-container">
        <h1 className='title'> Login Page</h1>
        <div className="screen">
            <div className="screen__content">
                <form className="login">
                    <div className="login__field">
                        <i className="login__icon fas fa-user"></i>
                        <input type="text" className="login__input" placeholder="User name / Email"  onChange={(e)=> setUserEmail(e.target.value)}/>
                    </div>
                    <div className="login__field">
                        <i className="login__icon fas fa-lock"></i>
                        <input type="password" className="login__input" placeholder="Password" onChange={(e)=> setUserPassword(e.target.value)}/>
                    </div>
                    <button className="button login__submit" onClick={(e)=> authentication(e)}>
                        <span className="button__text">Log In Now</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>	
                    <button className="button login__submit" onClick={(e)=> handleRegister(e)}>
                        <span className="button__text" >Register</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>				
                </form>
                <div className="social-login">
                    <h3>log in via</h3>
                    <div className="social-icons">
                        <a href="#" className="social-login__icon fab fa-instagram"></a>
                        <a href="#" className="social-login__icon fab fa-facebook"></a>
                        <a href="#" className="social-login__icon fab fa-twitter"></a>
                    </div>
                </div>
            </div>
            <div className="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>		
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
            </div>		
        </div>
    </div>

    
    
  )
}

export default Login