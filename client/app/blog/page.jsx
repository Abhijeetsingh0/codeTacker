'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { getTokenFromCookie } from '../components/getUserData';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/blog', {
          headers: {
            'authorization': `Bearer ${getTokenFromCookie}`, // Correct spelling of "Bearer"
          },
        });
        setBlogs(response.data.body);
        console.log(response.data.body)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className='container mt-8'>
      <div className='flex items-center justify-center'>
        <Link href='/blog/newBlog'>
          <button title='Add new blog' className="flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </Link>
      </div>

      <div>
        <h1>Blog List</h1>
        {blogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className='blog-item'>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              {blog.image && (
                <img src={blog.image} alt="Blog Image" style={{ maxWidth: '200px' }} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogList;