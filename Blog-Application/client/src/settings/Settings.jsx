import React, {useState, useEffect, useContext} from 'react'
import { cardData } from '../posts/post-card/cardData'
import '../settings/settings.css'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import { Context } from '../context/Context'
import axios from 'axios'
const Settings = () => {              
    const[userName, setUserName] = useState('')
    const[userEmail, setUserEmail] = useState('')   
    const[userPassword, setUserPassword] = useState('')  
    const[notification, setNotification] = useState(false)   
    const {user} = useContext(Context)         
    
    useEffect(()=>{
        setUserName(user.userName)
        setUserEmail(user.email)
    }, [])
    const handleUpdateUser = async()=>{
        try
        {
            await axios.put('http://localhost:5000/userApi/updateUser/' + user._id, {
                userId: user._id,
                userName: userName,
                email: userEmail,
                password: userPassword
            })
            setNotification(true)
        }
        catch(err)
        {
            console.error(err)
        }
    }
  return (
    <div class='settings'>
        <div className='settings-container'>
            <div className="setting-header">
                <span className='update'>Update Your Account</span>
                <span className='delete'>Delete Account</span>
            </div>
            <div className="pictures">
                <span>Profile Picture</span>
                <div className="images">
                    <img src={user?.profilePicture} alt="" />
                    <i class="fa-solid fa-user"></i>                
                </div>
            </div>
            <div className="inputs-container">
                <div className="username-input">
                    <span>Username</span>
                    <input type="text" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                </div>
                <div className="email-input">
                    <span>Email</span>
                    <input type="text" value={userEmail} onChange={(e)=> setUserEmail(e.target.value)}/>
                </div>
                <div className="password-input">
                    <span>Password</span>
                    <input type="password" value={userPassword} onChange={(e)=> setUserPassword(e.target.value)}/>
                </div>
                <div className="button-update">
                    <button onClick={handleUpdateUser}>Update</button>
                </div>
            </div>
            {
                notification && (
                    <span className='notification'>Profile has been updated successfully</span>
                )
            }
    </div>
    <Sidebar />
    </div>
  )
}

export default Settings