import React from 'react'
import Navbar from '../navbar/Navbar'
import './header.css'
const Header = () => {
  return (
    <div>
        <div className='second-header-part'>
            <div className="stack-app">
                <span className='stack'>React & Node</span>
                <span className='app'>BLOG</span>
            </div>
            <img src = "https://plus.unsplash.com/premium_photo-1669904022334-e40da006a0a3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
    </div>
  )
}

export default Header