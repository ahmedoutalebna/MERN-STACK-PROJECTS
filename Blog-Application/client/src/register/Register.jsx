import React, {useState, useEffect} from 'react'
import '../register/register.css'
import axios from 'axios'
const Register = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    // const postedData = {
    //     userName: userName,
    //     email: userEmail,
    //     password: userPassword 
    // }
    const register = async(e)=>{
        if(userName.trim() === "" || email.trim() === "" || password.trim() === "")
        {
            alert('Please fill all input before you register')
        
        }
        else
        {
            setError(false)
            e.preventDefault()
            try
            {
                // const response = await fetch('http://localhost:5000/api/register', {
                //     method: 'POST',
                //     headers:{
                //         'Content-type': 'application/json'
                //     },
                //     body: JSON.stringify(postedData)
                // })
                const response = await axios.post('http://localhost:5000/api/register', {
                    userName,
                    email,
                    password
                })

            }
            catch(err)
            {
                setError(true)
                console.error(err)
            }
        }

    }
    return (
        <div className="container">
            <h1 className='title'>Register Page</h1>
            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" placeholder="User name / Email" onChange={(e)=> setUserName(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-envelope"></i>
                            <input type="text" className="login__input" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                        </div>
                        <button type='button' className="button login__submit" onClick={(e)=> register(e)}>
                            <span className="button__text" >Register Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>				
                    </form>
                    <div className="social-login">
                        <h3>Register via</h3>
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
                    {
                            error && (
                            <div className='error-handler'>
                                <span>
                                Something went wrong
                                </span> 
                            </div>
                            )
                    }
                
            </div>
        </div>
    )
}

export default Register