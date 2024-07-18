// components/ErrorBoundary.jsx
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState({status:0,info:{}});

  useEffect(() => {

    const handleError = (error) => {
      console.error('Error Boundary Caught an Error:', error.filename);
      setHasError({status:400,message:error.message,filename:error.filename});
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  switch (hasError.status){
    case 400:
        return(
            <div className='container mt-32 w-4/5 grid justify-items-center text-zinc-700 bg-neutral-100 shadow-lg shadow-gray-400/50 rounded'>
                <div className='text-4xl'>Somthing went wrong :(</div> 
                <p className='m-16 text-zinc-400'> <span className='text-9xl'>400</span> <span className='text-md'>bad request</span></p>
                <p className='text-2xl'>message: {hasError.message}</p> 
                <p className='text-md m-5'>OnFile:  {(hasError.filename).slice(41,(hasError.filename).length)}</p> 
                <Link href='/'><button className='rounded-full bg-blue-400 pl-3 pr-3 p-2 mb-8 text-2xl' onClick={() => router.push('/')}>Go back home</button></Link> 
            </div> 
        )
  }

  return children;
};

export default ErrorBoundary;