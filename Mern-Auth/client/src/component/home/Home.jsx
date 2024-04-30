import React from 'react'
import { useLocation } from 'react-router-dom'
import './home.css'
const Home = () => {
    const location = useLocation()
    const userName = location?.state?.name
    const userEmail = location?.state?.email 

    return (
        <div className='home-container'>
            <h2>Name: {userName}</h2>
            <h2> Email: {userEmail}</h2>
        </div>
    )
}

export default Home