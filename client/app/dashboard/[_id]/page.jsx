'use client'
import { useState, useEffect } from 'react';
import { getTokenFromCookie } from '@/app/components/getUserData';
import withAuth from '@/app/components/withAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Code = ({ params }) => {
  const [codeDetails, setCodeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [codeSize, setCodeSize] = useState('md');

  const router = useRouter();

  const fetchCodeDetails = async () => {
    try {
      const response = axios.get(`http://localhost:8000/codeTracker/${params._id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie}`,
        },
      });
      setCodeDetails((await response).data.body);
      setLoading(false);
    } catch (err) {
      console.log('something went wrong while fetching the code details with _id :', err);
      setError({
        status: true,
        message: "Something went wrong while fetching the code details",
        error: err,
      });
    }
  };

  const deleteCodeTrack = async () => {
    try{
      const response = axios.delete(`http://localhost:8000/codeTracker/${params._id}`,{
        headers:{
          Authorization: `Bearer ${getTokenFromCookie}`,
        }
      })
      router.push('/dashboard')
    }catch(err){
      console.log(`somthing went wrong while deleteing code id ${params._id} with error ${err}`)
    }finally{
      router.push('/dashboard')
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

  useEffect(() => {
    if (getTokenFromCookie === undefined) {
      router.push('/auth/login');
    }
    fetchCodeDetails();
  }, []);

  if (loading) {
    return (
      <div>
        Loading ...
      </div>
    );
  }

  if (error.status) {
    return (
      <div>
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto mt-4 grid grid-cols-3 items-center">
        <div className=''></div>
        <div className="mb-5 bg-zinc-200 shadow-lg shadow-gray-400/50 p-2 rounded-full text-xl justify-self-center sm:justify-self-center sm:w-2/3 w-full">
          <a href={codeDetails.quesLink} className="block text-center">Question Link</a>
        </div>
        <div className="text-right">
          <time className="underline text-xs">{formatDate(codeDetails.updatedAt)}</time>
        </div>
      </div>

      <div className='container mx-auto px-4'>
        <div>Click to change the size</div>
        <div className="flex justify-start">
          <button className='bg-zinc-200 shadow-lg shadow-gray-400/50 pl-4 pr-4 mt-3 mb-3 rounded-full' onClick={() => setCodeSize('text-xs')}>Small</button>
          <button className='bg-zinc-200 shadow-lg shadow-gray-400/50 pl-4 pr-4 mt-3 mb-3 ml-5 rounded-full' onClick={() => setCodeSize('text-base')}>Medium</button>
          <button className='bg-zinc-200 shadow-lg shadow-gray-400/50 pl-4 pr-4 mt-3 mb-3 ml-5 rounded-full' onClick={() => setCodeSize('text-xl')}>Large</button>
        </div>

        <button onClick={()=>deleteCodeTrack()} className='mt-4 bg-red-400 shadow-lg shadow-red-400/50 p-1 pl-4 pr-4 rounded-xl text-xl'>Delete</button>
        <button onClick={()=>{}} className='mt-4 ml-8 bg-cyan-300 shadow-lg shadow-cyan-400/50 p-1 pl-8 pr-8 rounded-xl text-xl'>Edit</button>

        <h2 className='bold text-2xl mb-2 mt-5 underline'>Problem statment</h2>
        <pre className={`border border-zinc-600 p-3 overflow-auto ${codeSize}`}>{codeDetails.problemStatement}</pre>

        

        <h2 className='bold text-2xl mb-2 mt-8 underline'>Solution</h2>
        <pre className={`border border-zinc-600 p-3 overflow-auto ${codeSize}`}>{codeDetails.solution}</pre>

      </div>
    </div>
  );
}

export default withAuth(Code);
