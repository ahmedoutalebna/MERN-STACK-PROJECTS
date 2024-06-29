import React, {useState, useEffect, useContext} from 'react'
import house from '../../assets/house.jpeg'
import './card.css'
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios'
import { Context } from '../context/Context'
const Card = ({setUpdateMode, setUpdatedMemorieId}) => {
  const[memories, setMemories] = useState(null)
  const[error, setError] = useState('')
  const[loading, setLoading] = useState('')
  const {user}  = useContext(Context)
  const link = 'http://localhost:5500/images/'
  useEffect(()=>{
    fetchMemories()
  }, [])

  const fetchMemories = async()=>{
      try
      {
        const res = await axios.get('http://localhost:5500/api/memories')
        setMemories(res.data)
        console.log(res.data)
      }
      catch(err)
      {
        setError(err)
        console.error(err)
      }
  }
  const handleDelete = async(memorieId)=>{
    try
    {
      const res = await axios.delete('http://localhost:5500/api/memorie/' + memorieId)
      if(res.data)
      {
        let newMemory = memories.filter((item)=> item._id != memorieId)
        setMemories(newMemory)
        toast.success("Memorie is deleted successfully")
      } 
      else toast.error('Cannot be deleted')
    }
    catch(err)
    {
      console.error(err)
    }
  }
  const handleUpdateMemorie = async(memorieId) =>{
      console.log('... updated memorie triggered')
      setUpdateMode(true)
      setUpdatedMemorieId(memorieId)
  }
  return (
    <div className='card-container'>
    {
      memories?.map((item, index)=>(
        <div className="card">
        <div className="first-section">
          <img src={link + item.image}  alt="" className='images-card'/>
          <div className="overlay"></div>
          <div className="informations-memory">
            <div className="sub">
              <h4>{item.creator}</h4>
              <span>2 months ago</span>
            </div>
            {
              user && <div className="dots" onClick={()=> handleUpdateMemorie(item._id)}>
              <span>...</span>
            </div>
            }
          </div>
        </div>
        <div className="second-section">
          <span>{item.tags}</span>
          <h2>{item.title}</h2>
          <p className='text'>
              {item.message}
          </p>
          <div className="likes-delete">
            <span className='icons-container'> <i class="fa-solid fa-thumbs-up"></i> <span>Like</span></span>
            {
              user && <span className='icons-container' onClick={()=> handleDelete(item._id)}> <i class="fa-solid fa-trash"></i> <span>Delete</span></span>
            }
          </div>
        </div>
      </div>
      ))      

    }
      {/* <div className="card">
        <div className="first-section">
          <img src={house} alt="" className='images-card'/>
          <div className="overlay"></div>
          <div className="informations-memory">
            <div className="sub">
              <h4>Name</h4>
              <span>2 months ago</span>
            </div>
            <div className="dots">
              <span>...</span>
            </div>
          </div>
        </div>
        <div className="second-section">
          <span>#tags#tags#tags#tags</span>
          <h2>Visit Mecca and Medina</h2>
          <p className='text'>
            I want to visit mecca in the comming days inchallah
          </p>
          <div className="likes-delete">
            <span className='icons-container'> <i class="fa-solid fa-thumbs-up"></i> <span>Like</span></span>
            <span className='icons-container'> <i class="fa-solid fa-trash"></i> <span>Delete</span></span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="first-section">
          <img src={house} alt="" className='images-card'/>
          <div className="overlay"></div>
          <div className="informations-memory">
            <div className="sub">
              <h4>Name</h4>
              <span>2 months ago</span>
            </div>
            <div className="dots">
              <span>...</span>
            </div>
          </div>
        </div>
        <div className="second-section">
          <span>#tags#tags#tags#tags</span>
          <h2>Visit Mecca and Medina</h2>
          <p className='text'>
            I want to visit mecca in the comming days inchallah
          </p>
          <div className="likes-delete">
            <span className='icons-container'> <i class="fa-solid fa-thumbs-up"></i> <span>Like</span></span>
            <span className='icons-container'> <i class="fa-solid fa-trash"></i> <span>Delete</span></span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="first-section">
          <img src={house} alt="" className='images-card'/>
          <div className="overlay"></div>
          <div className="informations-memory">
            <div className="sub">
              <h4>Name</h4>
              <span>2 months ago</span>
            </div>
            <div className="dots">
              <span>...</span>
            </div>
          </div>
        </div>
        <div className="second-section">
          <span>#tags#tags#tags#tags</span>
          <h2>Visit Mecca and Medina</h2>
          <p className='text'>
            I want to visit mecca in the comming days inchallah
          </p>
          <div className="likes-delete">
            <span className='icons-container'> <i class="fa-solid fa-thumbs-up"></i> <span>Like</span></span>
            <span className='icons-container'> <i class="fa-solid fa-trash"></i> <span>Delete</span></span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="first-section">
          <img src={house} alt="" className='images-card'/>
          <div className="overlay"></div>
          <div className="informations-memory">
            <div className="sub">
              <h4>Name</h4>
              <span>2 months ago</span>
            </div>
            <div className="dots">
              <span>...</span>
            </div>
          </div>
        </div>
        <div className="second-section">
          <span>#tags#tags#tags#tags</span>
          <h2>Visit Mecca and Medina</h2>
          <p className='text'>
            I want to visit mecca in the comming days inchallah
          </p>
          <div className="likes-delete">
            <span className='icons-container'> <i class="fa-solid fa-thumbs-up"></i> <span>Like</span></span>
            <span className='icons-container'> <i class="fa-solid fa-trash"></i> <span>Delete</span></span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="first-section">
          <img src={house} alt="" className='images-card'/>
          <div className="overlay"></div>
          <div className="informations-memory">
            <div className="sub">
              <h4>Name</h4>
              <span>2 months ago</span>
            </div>
            <div className="dots">
              <span>...</span>
            </div>
          </div>
        </div>
        <div className="second-section">
          <span>#tags#tags#tags#tags</span>
          <h2>Visit Mecca and Medina</h2>
          <p className='text'>
            I want to visit mecca in the comming days inchallah
          </p>
          <div className="likes-delete">
            <span className='icons-container'> <i class="fa-solid fa-thumbs-up"></i> <span>Like</span></span>
            <span className='icons-container'> <i class="fa-solid fa-trash"></i> <span>Delete</span></span>
          </div>
        </div>
      </div> */}

    </div>
  )
}

export default Card