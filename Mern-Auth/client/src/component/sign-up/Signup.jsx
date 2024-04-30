import React,{useState} from 'react'

const Signup = () => {
  const[userName, setUserName] = useState()
  const[userPassword, setUserPassword] = useState()
  const[userEmail, setUserEmail] = useState()
  const postedData = {
    name: userName,
    email: userEmail,
    password: userPassword
  }
  const handleSignUp = async()=>{
    try
    {
      const data = await fetch('http://localhost:5500/users/register', {
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify(postedData)
      })
      const response = await data.json()
      if(response.name && response.email && response.password)
      {
        alert('user is successfully registerd ')
      }
      else
      {
        alert(response.message)
      }
    }
    catch(err)
    {
      console.error(err)
    }
  }
  return (
    <div class="container">
        <div class="wrapper">
            <div class="title"><span>Login Form</span></div>
            <form action="#">
              <div class="row">
                  <i class="fas fa-user"></i>
                  <input type="text" placeholder="Username" required onChange={(e)=>setUserName(e.target.value)}/>
              </div>
              <div class="row">
                <i class="fas fa-envelope"></i>
                <input type="text" placeholder="Email" required onChange={(e)=> setUserEmail(e.target.value)}/>
              </div>
              <div class="row">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" required onChange={(e)=> setUserPassword(e.target.value)}/>
              </div>
              <div class="pass"><a href="#">Forgot password?</a></div>
              <div class="row button">
                <input type="submit" value="register user" onClick={handleSignUp}/>
              </div>
            </form>
        </div>
    </div> 
  )
}

export default Signup