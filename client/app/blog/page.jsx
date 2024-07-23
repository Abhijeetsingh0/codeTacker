'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { getTokenFromCookie } from '../components/getUserData';
import axios from 'axios';
import withAuth from '../components/withAuth';
import { useRouter } from 'next/navigation';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    fetchBlogs();
  }, []);


  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/blog', {
        headers: {
          'authorization': `Bearer ${getTokenFromCookie}`, // Correct spelling of "Bearer"
        },
      });
      setBlogs(response.data.body);
      // console.log(response.data.body)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };


  const BlogSection = ({ blogs }) => {
    const router = useRouter();
    return blogs.map((blog, index) => (
      <div key={index} className=''>
        <div style={{backgroundImage: `url(${blog.images[0]})`}} className='flex shadow-lg shadow-gray-400/50 p-4 pr-4 mt-4 mb-4 ml-5 rounded hover:text-xl text-justify'>
          <div className='flex-auto w-4/5 overflow-auto pl-4 pr-16 border-r-4 border-emerald-300'>
            {blog.title.slice(0, 150)} ...
          </div>
          <div className='flex-auto pl-3 w-1/5'>
            <button
              className='ml-8 pl-8 pr-8 pt-2 pb-2 border bg-emerald-500 rounded'
              onClick={() => router.push(`/blog/${blog._id}/`)}
            >
              View
              {console.log(blog.images[0])}
            </button>
          </div>
        </div>
      </div>
    ));
  };


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
        <BlogSection blogs={blogs}/>
      </div>
    </div>
  );
}

export default withAuth(BlogList);