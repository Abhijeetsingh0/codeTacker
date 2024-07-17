// components/ErrorBoundary.jsx
'use client'
import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState({status:false,info:{}});

  useEffect(() => {
    const handleError = (error) => {
      console.error('Error Boundary Caught an Error:', error.filename);
      setHasError({status:true,message:error.message,filename:error.filename});
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError.status) {
    return (
        <div className='container w-4/5 grid justify-items-center bg-zinc-200 shadow-lg shadow-gray-400/50 rounded'>
            <div className='text-4xl mb-16'>Somthing went wrong :(</div>
            <p className='text-2xl'>message: {hasError.message}</p>
            <p className='text-md m-5'>OnFile:  {(hasError.filename)}</p>
            {console.log("here is the errr",hasError)}
        </div>
    )
  }

  return children;
};

export default ErrorBoundary;
