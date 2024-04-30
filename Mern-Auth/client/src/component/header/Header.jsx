import React, {useState} from 'react';
import './header.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false)
  const userName = location?.state?.name; // Access nested state property
  const userEmail = location?.state?.email;
  const userPass = location?.state?.password;
  const handleHomePage = () => {
    navigate('/');
  };

  const signInHandler = () => {
    navigate('/signIn');
  };

  const signUpHandler = () => {
    navigate('/signUp');
  };

  const handleLoggingOut = async()=>{
    try
    {
      const data = await fetch('http://localhost:5500/users/logout')
      const response = await data.json()
      console.log(response)
      if(response)
      {
        navigate('/signIn')
      }
    }
    catch(err)
    {
      console.error(err)
    }
  }
  const userProfile = ()=>{
    navigate('/profile', {state: {name: userName, email: userEmail, password: userPass}})
  }
  return (
    <div className="header-content">
      <h2 onClick={handleHomePage}>MERN AUTH</h2>
      {userName && ( 
        <div className="profile-container">
          <span className='profile'><i class="fa-solid fa-user" style={{color: 'dimgray'}}></i></span>
          <span className='logout' onClick={handleLoggingOut}>Logout </span>
          <span onClick={()=> setShowProfile(!showProfile)}>{userName}</span>
            {
              showProfile && (
                <div className="sub-container">
                    <span onClick={userProfile}>Profile details</span>
                </div>
 
              )
            }
          </div>
      )}
      {!userName && ( 
        <div className="sign-content">
          <div className="signin-section">
            <span onClick={signInHandler}>Sign in</span>
            <i className="fa-solid fa-right-to-bracket"></i> 
          </div>
          <div className="signup-section">
            <span onClick={signUpHandler}>Sign up</span>
            <i className="fa-solid fa-right-to-bracket"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
