'use client'
import { useState } from 'react';
import { getTokenFromCookie } from '../components/getUserData';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('commentId', 'cdsacasdcdasc')
        images.forEach(image => {
            formData.append('image', image);
        });
        console.log(formData)
        try {
            const response = await axios.post("http://localhost:8000/blog/", formData ,{
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie}`
                }
            });
            
            router.push('/dashboard')
  
        } catch (error) {
            console.error('Something went wrong:', error.response ? error.response.data : error.message);
        } 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Images</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit">Create Blog</button>
        </form>
    );
};

export default CreateBlog;
