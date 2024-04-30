import React, { useEffect, useState, useContext} from 'react';
import './write.css';
import axios from 'axios'
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
const Write = () => {
    const {user} = useContext(Context)
    const [imageFile, setImageFile] = useState('');
    const [title, setTitle] = useState('')
    const [story, setStory] = useState('')
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState('')
    const navigate = useNavigate()

    const post = {
        title: title,
        author: user.userName,
        content: story,
        postImageSource: fileName,
    }
    const handleImageChange = (e) => {
        const fl = e.target.files[0];
        setFile(fl)
        setFileName(fl.name)
        if (fl) {
            const imageUrl = URL.createObjectURL(fl);
            console.log(imageUrl)
            setImageFile(imageUrl);
        }
    };

    const publishing = async () => {
        // Add your publishing logic here
        console.log('... publishing')
        if(imageFile)
        {
            const data = new FormData()
            data.append('name', fileName)
            data.append('file', file)
            try
            {
                const res2 = await axios.post('http://localhost:5000/upload', data)
                if(res2.data)
                {
                    console.log(res2.data)
                }

            }
            catch(err){}
        }
        try
        {
            const res = await axios.post('http://localhost:5000/createPost', post)
            if(res.data)
            {
                alert('Post created successfully')
            }
        }
        catch(err)
        {
            console.error(err)
        }
    };

    return (
        <div>
            <div className="write-wrapper">
                {imageFile ? (
                    <img src={imageFile} alt="Selected" className="image-preview" />
                ) : (
                    <div className="cadre"></div>
                )}
                <div className="informations">
                    <label htmlFor="fileInput">
                        <i className="fa-solid fa-plus" style={{ color: 'gray', cursor: 'pointer' }}></i>
                    </label>
                    <input id="fileInput" type="file" className="inputs" style={{ display: 'none' }} onChange={handleImageChange} />
                    <div className="title-div">
                        <input type="text" className="text" placeholder="Title" autoFocus onChange={(e)=> setTitle(e.target.value)}/>
                    </div>
                    <button className="publish-button" onClick={publishing}>
                        Publish
                    </button>
                </div>
                <input type="text" placeholder="Tell your story..." className="story" onChange={(e)=> setStory(e.target.value)}/>
            </div>
        </div>
    );
};

export default Write;
