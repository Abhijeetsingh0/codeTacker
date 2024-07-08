'use client'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useGlobalDispatch, useGlobalState } from '@/contexts/globalStataeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const dispatch = useGlobalDispatch()
  

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
      router.push('/');
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => email && password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded ${
              isFormValid() ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}


export default Login