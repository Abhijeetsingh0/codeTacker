'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { getTokenFromCookie } from '../components/getUserData';
import axios from 'axios';
import withAuth from '../components/withAuth';
import Loading  from "@/app/components/loading"
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
      console.log(response.data.body)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };


  const BlogSection = ({ blogs }) => {
    const router = useRouter();
    return blogs.map((blog, index) => (
      <div key={index} className='flex items-stretch bg-white shadow-lg shadow-gray-400/50 rounded-xl mt-4 text-justify'>
        <div className='basis-4/5 px-8 py-8 px-2'>
          <div className='font-bold text-3xl mt-8 mb-4'>
            {blog.title.slice(0, 150)} ...
          </div>
          <div className='text-xl'>
            {blog.content.slice(0, 150)} ...
          </div>
          <div className='flex-auto w-1/5 '>
            <button
              className='pl-8 pr-8 pt-2 pb-2 mt-4 border bg-emerald-500 rounded '
              onClick={() => router.push(`/blog/${blog._id}/`)}
            >
              View
            </button>
          </div>
        </div>
        <div className='py-4' >
        { blog.images.length <= 0 ? (<></>) : (<img className='basis-1/5 md:basis-1 size-48 rounded' src={blog.images[0]}/>) }
        </div>
      </div>
    ));
  };

  if (loading && !blogs) {
    return <Loading message="Loading blogs ...."/>
  }

  return (
    <div className='backdrop-blur-xl h-dvh overflow-auto pb-36'>
      <div className='container mt-8'>
      <div className='flex items-center justify-center mb-8'>
        <Link href='/blog/newBlog'>
          <button title='Add new blog' className="flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </Link>
      </div>

      <div>
        <BlogSection blogs={blogs}/>
      </div>

    </div>
    </div>
    
  );
}

export default withAuth(BlogList);