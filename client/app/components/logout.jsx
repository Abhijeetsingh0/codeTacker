'use client'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import withAuth from './withAuth';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/auth/login')
    window.location.replace('/auth/login')
  };

  return (
    <button onClick={handleLogout} className="px-2 py-1 bg-red-500 text-white">
      Logout
    </button>
  );
};

export default withAuth(Logout)