'use client'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useGlobalDispatch } from '@/contexts/globalStataeContext';
import { getTokenFromCookie } from '@/app/components/getUserData'
import { useEffect } from 'react';
import Link from 'next/link'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const dispatch = useGlobalDispatch()
  
  useEffect(()=>{
    const tokenCookie = getTokenFromCookie
    if(tokenCookie){
      router.push('/dashboard')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });
      const token = response.data.token;

      // Set the token in a cookie with a TTL of 1 hour (3600 seconds)
      Cookies.set('token', token, { expires: 1 / 24 });

      dispatch({type: 'SET_TOKEN', payload: token})
      // Redirect to homepage or any other page
      window.location.replace('/dashboard')

      router.push('/dashboard');

    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => email && password;

  return (
    <div className="min-h-full flex flex-col items-center justify-center mt-16">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md bg-white">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded-xl md-64 font-semibold mb-4 ${
              isFormValid() ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </form>
      </div>
      <span className='border-t-4 border-dotted rounder-full border-zinc-400 w-80 mt-16 mb-4'></span>
      <Link href="/auth/register">
        <button className='mt-8 bg-zinc-950 pl-12 pr-12 p-2 border rounded-xl text-xl font-semibold text-white hover:bg-zinc-700'>
          New User ?
        </button>
      </Link>
    </div>
  );
}


export default Login