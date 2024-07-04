'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
 
const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      setIsSubmitting(true);
  
      try {
        console.log('http://'+"localhost:8000"+'/auth/register')
        await axios.post('http://'+"localhost:8000"+'/auth/register', {
          username,
          email,
          password,
        });
        router.push('/auth/login')
      } catch (error) {
        alert('Signup failed! , Error :',error);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const isFormValid = () =>
      username && email && password && confirmPassword && password === confirmPassword;
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    );
}

export default RegisterUser
