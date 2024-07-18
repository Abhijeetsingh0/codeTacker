'use client'
import withAuth from '../components/withAuth'; // Adjust the import path as needed
import {fetchUserProfile} from '../components/getUserData'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {getTokenFromCookie} from "@/app/components/getUserData"
import Link  from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '../components/loading';

const CodeTrackSection = ({ codeTrack }) => {
  const router = useRouter();

  return codeTrack.map((data, index) => (
    <div key={index}>
      <div className='flex bg-zinc-200 shadow-lg shadow-gray-400/50 p-4 pr-4 mt-4 mb-4 ml-5 rounded hover:text-xl text-justify'>
        <div className='flex-auto w-4/5 overflow-auto pl-4 pr-16 border-r-4 border-emerald-300'>
          {data.problemStatement.slice(0, 150)} ...
        </div>
        <div className='flex-auto pl-3 w-1/5'>
          <button
            className='ml-8 pl-8 pr-8 pt-2 pb-2 border bg-emerald-400 rounded'
            onClick={() => router.push(`/dashboard/${data._id}/`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  ));
};
        
const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [codeTrack, setCodeTrack] = useState({ loading: true, data: [] });
  const router = useRouter();

  const fetchCodeTrack = async () => {
    const token = getTokenFromCookie; // Correctly call the function to get the token
    if (!token) {
      router.push("/auth/login");
      return; // Prevent further execution
    }
  
    try {
      const response = await axios.get('http://localhost:8000/codeTracker/', {
        headers: {
          'authorization': `Bearer ${token}`, // Correct spelling of "Bearer"
        },
      });
      setCodeTrack({ loading: false, data: response.data.body });
    } catch (error) {
      console.error('Error fetching codeTrack:', error);
    }
  };

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const data = await fetchUserProfile();
        setUserData(data.body);
      } catch (error) {
        console.error("Something went wrong while fetching the user data in dashboard", error);
      }
    };

    fetchUserProfileData();
    fetchCodeTrack();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className='container'>
      <div className='flex justify-center m-10'>
        <Link href='/dashboard/codeform'>
          <button title='Add new code' className="flex items-center justify-center w-16 h-16 bg-emerald-400 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out">
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
      <div className="mx-auto px-4 mt-10 mb-8">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="bg-gray-100 p-4 flex-1">
            <h2 className="text-lg font-bold">Content 1</h2>
            <p>{userData['username']} component comes here</p>
          </div>
          <div className="bg-gray-100 p-4 flex-1">
            <h2 className="text-lg font-bold">Content 2</h2>
            <p>This is the second piece of content.</p>
          </div>
        </div>
      </div>
      <hr className='mb-8'></hr>
      <div className=''>
        {codeTrack.loading ? 
          <Loading/> :
          <CodeTrackSection codeTrack={codeTrack.data} />
        }
      </div>
    </div>
  );
};

export default withAuth(Dashboard);