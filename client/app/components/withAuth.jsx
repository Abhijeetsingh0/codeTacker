'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { getTokenFromCookie } from './getTokenFromCookie'; // Adjust the import path as needed

const withAuth = (WrappedComponent) => {
    return (props) => {
      const router = useRouter();
  
      useEffect(() => {
        const token = getTokenFromCookie
        console.log(token,"cdscsd")
        if (!token) {
          router.push('/auth/login');
        }
      }, []);
  
      return <WrappedComponent {...props} />;
    };
  };
  
  export default withAuth;