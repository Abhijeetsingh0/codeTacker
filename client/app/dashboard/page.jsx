'use client'
import withAuth from '../components/withAuth'; // Adjust the import path as needed
import {fetchUserProfile} from '../components/getUserData'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {getTokenFromCookie} from "@/app/components/getUserData"
import Link  from 'next/link';

const Dashboard = () => {

  const [userData, setUserData] = useState({})
  const [codeTrack , setCodeTrack] = useState([])

  const fetchCodeTrack = async () =>{
      await axios.get('http://localhost:8000/codeTracker/',{
        headers: {
          'authorization': `Barer ${getTokenFromCookie}`
        }
      })
      .then((data)=>{
        setCodeTrack(data.data.body)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  useEffect(()=>{
    fetchUserProfile()
    .then((data)=>{
      setUserData(data.body)
    })
    .catch((err)=>{
      console.log("somthing went wrong while fetching the user data in dashboard",err)
    })

    fetchCodeTrack()

  },[])

  return (
    <div>
      <div className='flex justify-center m-10' title='Add new code'>
        <Link href='/dashboard/codeform'> 
          <button className="flex items-center justify-center w-16 h-16 bg-emerald-400 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          </button>
        </Link>
      </div>
      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* First content block */}
          <div className="bg-gray-100 p-4 flex-1">
            <h2 className="text-lg font-bold">Content 1</h2>
            <p>{userData['username']} component comes here</p>
          </div>
          {/* Second content block */}
          <div className="bg-gray-100 p-4 flex-1">
            <h2 className="text-lg font-bold">Content 2</h2>
            <p>This is the second piece of content.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);