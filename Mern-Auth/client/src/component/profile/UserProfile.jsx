import React, { useEffect, useState } from 'react'
import './profile.css'
import { useLocation } from 'react-router-dom'
const UserProfile = () => {
    const location = useLocation()
    const name = location?.state?.name
    const email = location?.state?.email
    const password = location?.state?.password 
    const [userName, setUserName] = useState(name)
    const [userEmail, setUserEmail] = useState(email)
    const [userPass, setUserPass] = useState(password)
    useEffect(() => {
        console.log('name: ', name)
        console.log('email: ', email)
        console.log('password: ', password)
        updateUserProfile()
    }, [])
    // const updatedData = {
    //     name: 
    // }
    const updateUserProfile = async () => {
        try {
            const data = await fetch('http://localhost:5500/users/getUserProfile', {
                method: 'PUT',
                headers:{
                    'Content-type': 'text/json'
                },
                body: JSON.stringify()
            })
            const response = await data.json()
            console.log(response)
        }
        catch (err) {
            console.error(err)
        }
    }
    return (
        <div className='prf-container'>
            <div className="input-container">
                <label htmlFor="name">Name :</label>
                <input type="text" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
            </div>
            <div className="input-container">
                <label htmlFor="email">Email :</label>
                <input type="text" value={userEmail} onChange={(e)=> setUserEmail(e.target.value)}/>
            </div>
            <div className="input-container">
                <label htmlFor="password">Password :</label>
                <input type="text" value={userPass} onChange={(e)=> setUserPass(e.target.value)}/>
            </div>
            <div className="btn">
                <button className='update-profile'>Update</button>
            </div>
        </div>
    )
}

export default UserProfile