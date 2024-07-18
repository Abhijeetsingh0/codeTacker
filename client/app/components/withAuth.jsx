'use client'
// import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { getTokenFromCookie, fetchUserProfile } from './getUserData'; // Adjust the import path as needed
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
    return (props) => {
      const router = useRouter();
      
      useEffect(()=>{
        console.log(getTokenFromCookie)
        if(!getTokenFromCookie){
          router.push('/auth/login/')
          window.location.reload()
        }
      })

      return <WrappedComponent {...props} />;
    };

  };
  
  export default withAuth;