import React, {useContext} from 'react'
import './home.css'
import Posts from '../posts/Posts'
import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'
import { Context } from '../context/Context'
const Home = () => {
  const {user} = useContext(Context)
  console.log(user)
  return (
    <div className='home-container'>

        <Header />
        <div className="sidePost-container">
            <Posts />
            <Sidebar />
        </div>
    </div>
  )
}

export default Home