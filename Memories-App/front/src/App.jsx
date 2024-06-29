import React, {useState, useEffect, useContext} from 'react'
import Header from './components/header/Header'
import './App.css'
import Card from './components/card/Card'
import Form from './components/form/Form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import {Routes, Route} from 'react-router-dom'
import { Context } from './components/context/Context'
const App = () => {
  const [updateMode, setUpdateMode] = useState(false)
  const [updatedMemorieId, setUpdatedMemorieId] = useState('')
  const {user} = useContext(Context)
  useEffect(()=>{
    console.log('from app component: ', user)
  }, [user])
  return (
    <Routes>
    <Route path='/' element={
          <div className='container'>
          <ToastContainer />
          <Header/>
          <div className="form-card-container">
            <Card setUpdateMode = {setUpdateMode} setUpdatedMemorieId = {setUpdatedMemorieId}/>            
            {            
              user && <Form updateMode = {updateMode} setUpdateMode = {setUpdateMode} updatedMemorieId = {updatedMemorieId}/>
            }           
          </div>
        </div>
    }/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
    </Routes>
    /*
      Focus on quantity over quality 
    */

  )
}

export default App