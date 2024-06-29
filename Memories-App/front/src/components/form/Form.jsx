import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './form.css';

const Form = ({ updateMode, setUpdateMode, updatedMemorieId }) => {
    const [imageName, setImageName] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [formData, setFormData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        image: ''
    });
    const [updatedFormData, setUpdatedFormData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        image: '',
    });

    useEffect(() => {
        if (updateMode && updatedMemorieId) {
            fetchCurrentMemorie(updatedMemorieId);
        }
    }, [updateMode, updatedMemorieId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageName(file.name);
        if (file) {
            let url = URL.createObjectURL(file);
            setImageUrl(url);
            setSelectedImage(file);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setFormData({ ...formData, image: imageName });
        if (imageUrl) {
            const data = new FormData();
            data.append('file', selectedImage);
            data.append('name', imageName);
            data.append('creator', formData.creator);
            data.append('title', formData.title);
            data.append('message', formData.message);
            data.append('tags', formData.tags);
            data.append('image', formData.image);

            try {
                const res = await axios.post('http://localhost:5500/api/upload', data);
                if (res.data) {
                    toast.success('Image uploaded to the server successfully');
                }
            } catch (err) {
                toast.error('Error in uploading image to the server');
            }
        }

        try {
            const res = await axios.post('http://localhost:5500/api/memorie', formData);
            if (res.data) {
                toast.success('Memory added successfully');
            }
        } catch (err) {
            toast.error('Error in adding memory');
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleClearForm = () => {
        setFormData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            image: ''
        });
        setSelectedImage(null);
        setImageName('');
    };

    const handleUpdateForm = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('creator', updatedFormData.creator);
        data.append('title', updatedFormData.title);
        data.append('message', updatedFormData.message);
        data.append('tags', updatedFormData.tags);
        if (selectedImage) {
            data.append('file', selectedImage);
            data.append('name', imageName);
        }
        try {
            const res = await axios.put(`http://localhost:5500/api/memorie/${updatedMemorieId}`, data);
            if (res.data) {
                toast.success('Memory updated successfully');
                console.log(res.data)
            }
        } catch (err) {
            toast.error('Error in updating memory');
            console.error(err);
        }
        setUpdateMode(false)
    };

    const fetchCurrentMemorie = async (updatedMemorieId) => {
        try {
            const res = await axios.get(`http://localhost:5500/api/memorie/${updatedMemorieId}`);
            if (res.data) {
                setUpdatedFormData({
                    creator: res.data.creator,
                    title: res.data.title,
                    message: res.data.message,
                    tags: res.data.tags,
                    image: res.data.image
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdatedInputChange = (e) => {
        setUpdatedFormData({ ...updatedFormData, [e.target.id]: e.target.value });
    };

    return (
        
        <div className='form-container'>
            {
                updateMode ? (
                    <form onSubmit={handleUpdateForm}>
                        <h3>Updating Memories</h3>
                        <div className="row">
                            <label htmlFor="creator"> Creator </label>
                            <input type="text" id='creator' placeholder='Creator...' value={updatedFormData.creator} onChange={handleUpdatedInputChange} />
                        </div>
                        <div className="row">
                            <label htmlFor="title"> Title </label>
                            <input type="text" id='title' placeholder='Title...' value={updatedFormData.title} onChange={handleUpdatedInputChange} />
                        </div>
                        <div className="row">
                            <label htmlFor="message"> Message </label>
                            <input type="text" id='message' placeholder='Message...' value={updatedFormData.message} onChange={handleUpdatedInputChange} />
                        </div>
                        <div className="row">
                            <label htmlFor="tags"> Tags </label>
                            <input type="text" id='tags' placeholder='Tags...' value={updatedFormData.tags} onChange={handleUpdatedInputChange} />
                        </div>
                        <div className="choose-file">
                            <input type="file" placeholder='Choose file' onChange={handleFileChange} />
                        </div>
                        <div className="buttons">
                            <button className='submit' type='submit'>UPDATE</button>
                            <button className='clear' disabled={true} onClick={handleClearForm}>CLEAR</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <h3>Creating Memories</h3>
                        <div className="row">
                            <input type="text" id='creator' placeholder='Creator...' value={formData.creator} onChange={handleInputChange} />
                        </div>
                        <div className="row">
                            <input type="text" id='title' placeholder='Title...' value={formData.title} onChange={handleInputChange} />
                        </div>
                        <div className="row">
                            <input type="text" id='message' placeholder='Message...' value={formData.message} onChange={handleInputChange} />
                        </div>
                        <div className="row">
                            <input type="text" id='tags' placeholder='Tags...' value={formData.tags} onChange={handleInputChange} />
                        </div>
                        <div className="choose-file">
                            <input type="file" placeholder='Choose file' onChange={handleFileChange} />
                        </div>
                        <div className="buttons">
                            <button className='submit' type='submit'>SUBMIT</button>
                            <button className='clear' disabled={true} onClick={handleClearForm}>CLEAR</button>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default Form;
