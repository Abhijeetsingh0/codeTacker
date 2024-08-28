'use client'

import withAuth from '@/app/components/withAuth';
import { useState, useEffect } from 'react';
import Link  from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/loading';
import CalenderPage from './calender';
import DoughnutChart from './doughnutChart';
import {fetchCodeTrack} from "@/apis/codeTrackerApis"
        
const Dashboard = () => {
  const [codeTrack, setCodeTrack] = useState({data: []});
  const router = useRouter();

  useEffect(() => {
    
    fetchCodeTrack()
    .then((data)=>{setCodeTrack({data:data})})
    .catch((error)=>{
      alert(error)
      router.push('/')
    })
  
  }, []); // Empty dependency array to run once on mount

  if(codeTrack.data.length <= 0){
    return(
      <div className="backdrop-blur-xl h-dvh overflow-auto pb-36">
        <div className='flex justify-center my-4'>
          <Link href='/codeTrack/codeFormPage'>
            <button title='Add new code' className="flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out">
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
        <Loading/>
      </div>
    )
  }

  return (
    <div className='backdrop-blur-xl h-dvh overflow-auto pb-36'>
      <div className='container mt-12'>
        <div className='flex justify-center'>
          <Link href='/codeTrack/codeFormPage'>
            <button title='Add new code' className="flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out">
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
            <div className="bg-white shadow-lg shadow-gray-400/50 rounded-xl p-4 basis-2/5">
              <h2 className="text-lg font-bold pb-4">User Details</h2>
            {!codeTrack.loading && (<div><DoughnutChart data={codeTrack.data}/></div>)}

            </div>
            <div className="bg-white shadow-lg shadow-gray-400/50 rounded-xl p-4 basis-3/5">
              <h2 className="text-lg font-bold mb-8">Activity</h2>
              <CalenderPage />  
            </div>
          </div>
        </div>
        <hr className='mb-8'></hr>
        <div>
          {codeTrack.loading ? 
            <Loading/> :
            <CodeTrackSection codeTrack={codeTrack.data} />
          }
        </div>
      </div>
    </div>
  );
};

const CodeTrackSection = ({ codeTrack }) => {
  const router = useRouter();
  return codeTrack.map((data, index) => (
    <div key={index} className='overflow-auto'>
      <div className='flex bg-white shadow-lg shadow-gray-400/50 p-4 pr-4 mt-4 mb-4 ml-5 rounded-xl hover:text-xl text-justify'>
        <div className='flex-auto w-4/5 pl-4 pr-16 border-r-4 border-emerald-300'>
          {data.problemStatement.slice(0, 150)} ...
        </div>
        <div className='flex-auto pl-3 w-1/5'>
          <button
            className='ml-8 pl-8 pr-8 pt-2 pb-2 border bg-emerald-500 rounded-xl'
            onClick={() => router.push(`/codeTrack/${data._id}/`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  ));
};

export default withAuth(Dashboard);