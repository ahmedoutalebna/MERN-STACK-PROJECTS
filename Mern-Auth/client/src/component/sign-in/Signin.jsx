import React, {useState} from 'react'
import '../sign-up/signup.css'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const[userEmail, setUserEmail] = useState()
  const[userPass, setUserPass] = useState()
  // names in the database
  const[emailDb, setEmailDb] = useState()
  const[passDb, setPassDb] = useState()
  const navigate = useNavigate()
  const postedData = {
    email: userEmail,
    password: userPass
  }
  const handleSubmit = async()=>{
    try
    {
      const data = await fetch('http://localhost:5500/users/auth',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify(postedData)
      })
      const response = await data.json()
      if(response.email && response.password)
      {
        navigate('/home', {state: {name: response.name, email:response.email, password: response.password}})
      }
      else
      {
        alert('Invalid mail or password')
      }
    }
    catch(err)
    {
      console.error(err)
    }
  }

  const handleSignUp = ()=>{
    navigate('/signup')
  }
  return (
    <div class="container">
        <div class="wrapper">
            <div class="title"><span>Login Form</span></div>
            <form action="#">
              <div class="row">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Email or Phone" required onChange={(e)=> setUserEmail(e.target.value)}/>
              </div>
              <div class="row">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" required onChange={(e)=> setUserPass(e.target.value)}/>
              </div>
              <div class="pass"><a href="#">Forgot password?</a></div>
              <div class="row button">
                <input type="submit" value="Login"  onClick={handleSubmit}/>
              </div>
              <div class="signup-link">Not a member? <a onClick={handleSignUp}>Signup now</a></div>
            </form>
        </div>
    </div>
  )
}

export default Signin