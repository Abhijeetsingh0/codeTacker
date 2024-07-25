'use client'
import React from 'react'
import axios from 'axios'
import { getTokenFromCookie } from '@/app/components/getUserData'
import { useEffect, useState } from 'react'
import Loading from "@/app/components/loading"
import withAuth from '@/app/components/withAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";


const blogById = ({params}) => {
    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(false)
    const [contentSection, setContentSection] = useState([])
    
    const router = useRouter()
  
    const fetchBlog = async () =>{
        try{
            const response = axios.get(`http://localhost:8000/blog/${params._id}`, {
                headers: {
                  Authorization: `Bearer ${getTokenFromCookie}`,
                },
              });
            setBlog((await response).data.body)
            
            const regex = /@img\([^\)]+\)/;
            setContentSection((await response).data.body.content.split(regex))

            setLoading(false)
        }catch(err){
            alert("Somthing went wrong while fetching the blog data: ",err)
            console.log("Somthing went wrong while fetching the blog data: ",err)
            router.push('/')
        }
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = {
          weekday: 'long', // "Monday"
          year: 'numeric', // "2024"
          month: 'long', // "July"
          day: 'numeric', // "15"
          hour: 'numeric', // "12 PM"
          minute: 'numeric', // "11"
        };
        return date.toLocaleDateString('en-US', options);
      };

    useEffect(()=>{
        setLoading(true)
        fetchBlog()
    },[])

    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <div className='bg-blog-background bg-fixed bg-cover bg-center '>
            <div className='backdrop-blur-lg pt-12 '>
                <div className='container'>
                    <div className='flex px-32 justify-center w-full mb-8'>
                        <div className='text-gray-500 px-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg> 
                            {blog.email}
                        </div>
                        <div className='text-gray-500 px-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>

                            <span className='text-'>{formatDate(blog.createdAt)}</span>
                        </div>
                    </div> 
                    <div className='text-5xl px-16 text-black underline basis-4/6'>
                        {blog.title && String(blog.title).toUpperCase()}
                    </div>                   
                </div>

                <div className='mt-12 container px-24'>
                    {contentSection && contentSection.map((content,index)=>(
                        (
                            <div key={index}>
                                <div data-color-mode="light" > <MDEditor.Markdown source={content} style={{background: "none", fontSize: "26px"}} />  </div>
                                {/* {blog.images.length > index ? <img className='flex items-center justify-center container w-full h-fit my-8 ' src={blog.images[index]}/> : ""} */}
                                {blog.images.length > index ? 
                                    (<div className="container flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                                        <Image
                                          src={blog.images[index]}
                                          width={1000}
                                          height={750}
                                          className="hidden md:block rounded-xl w-full"
                                          alt="A playful kitten on a desktop environment"
                                        />
                                        <Image
                                          src={blog.images[index]}
                                          width={520}
                                          height={550}
                                          className="block md:hidden rounded-xl w-full"
                                          alt="A playful kitten seen on a mobile screen"
                                        />
                                      </div>
                                    )
                                :""}
                            </div>

                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default withAuth(blogById)