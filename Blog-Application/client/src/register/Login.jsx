import React, {useState, useEffect, useContext} from 'react'
import '../register/register.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'
import axios from 'axios'
const Login = () => {
    const [userEmail, setUserEmail] = useState('')
    const[userPassword, setUserPassword] = useState('')
    const[loggedIn, setLoggedIn] = useState(false)
    const {dispatch, isFetching, error, user} = useContext(Context)
    const navigate = useNavigate()

    const postedData = {
        email: userEmail,
        password: userPassword
    }

    const handleRegister = ()=>{
        navigate('/register')
    }


    const authentication = async(e)=>{
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try
        {
            const response = await axios.post('http://localhost:5000/api/authentication', postedData)
            dispatch({type: "LOGIN_SUCCESS", payload: response.data})
            console.log(user)
            if(response.statusText === 'OK')
            {
                navigate('/')
            }
        }
        catch(err)
        {
            console.error(err)
            dispatch({type: "LOGIN_FAILURE"})
        }
    }

  return (
    <div className="container">
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
                <button className="button login__submit">
                    <span className="button__text" onClick={handleRegister}>Register</span>
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


