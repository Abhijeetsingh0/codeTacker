'use client'
import { useState, useEffect } from 'react';
import { getTokenFromCookie } from '@/app/components/getUserData';
import withAuth from '@/app/components/withAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loading from "@/app/components/loading"
// import CodeEdit from "./edit/edit"

const Code = ({ params }) => {
  const [codeDetails, setCodeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [isEditing, setIsEditing] = useState(false)
  const [codeSize, setCodeSize] = useState('md');
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, value.trim()]
      }));
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const isFormValid = () => {
    return (
      formData.programingLanguage.trim() &&
      formData.quesLink.trim() &&
      formData.problemStatement.trim() &&
      formData.solution.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSubmitting(true);

      if (!getTokenFromCookie) {
        alert('Please login');
        router.push('/auth/login')
      }
      try {
          const response = await axios.put(`http://localhost:8000/codeTracker/${params._id}`, formData ,{
              headers: {
                  'Authorization': `Bearer ${getTokenFromCookie}`
              }
          });
          alert("The changes have been saved!")
          setCodeDetails(formData)
          setIsEditing(false)
      } catch (error) {
          console.error('Something went wrong:', error.response ? error.response.data : error.message);
         } 

      setIsSubmitting(false); // Reset submitting state
    }
  };

  if(isSubmitting){
    <Loading message={"Submitting...."} />
  }

  const fetchCodeDetails = async () => {
    try {
      const response = axios.get(`http://localhost:8000/codeTracker/${params._id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie}`,
        },
      });
      setCodeDetails((await response).data.body);
      setFormData((await response).data.body)
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
     <Loading/>
    );
  }

  if (error.status) {
    return (
      <div>
        {error.message}
      </div>
    );
  }

  if(isEditing && formData){
    return (
      <div className="container mt-10 mb-8 bg-zinc-200 shadow-lg shadow-gray-400/50 rounded-xl pl-32 pr-32 pb-16 pt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Save your code
        </h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <label className="block text-gray-700 font-semibold mb-1 ">Programming Language</label>
            <input
              type="text"
              name="programingLanguage"
              value={formData.programingLanguage}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl bg-zinc-50 shadow-lg shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
  
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <label className="block text-gray-700 font-semibold mb-1">Question Link</label>
            <input
              type="text"
              name="quesLink"
              value={formData.quesLink}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl bg-zinc-50 shadow-lg shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
  
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <label className="block text-gray-700 font-semibold mb-1">Problem Statement</label>
            <textarea
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl bg-zinc-50 shadow-lg shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
  
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <label className="block text-gray-700 font-semibold mb-1">Solution</label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              rows="20"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl bg-zinc-50 shadow-lg shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
  
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <label className="block text-gray-700 font-semibold mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-zinc-50 text-gray-800 px-3 py-1 rounded-xl flex items-center font-semibold shadow-md"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-2 text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              onKeyDown={handleTagChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-lg shadow-gray-400/50 bg-zinc-50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
  
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full px-4 py-2 rounded-lg shadow-lg ${
              !isFormValid() || isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition duration-300 ease-in-out`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto mt-4 grid grid-cols-3 items-center">
        <div className=''></div>
        <div className="mb-5 bg-emerald-400 shadow-lg bg-emerald-400/50 p-2 rounded-full text-xl justify-self-center sm:justify-self-center sm:w-2/3 w-full">
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
        <button onClick={()=>{setIsEditing(true)}} className='mt-4 ml-8 bg-cyan-300 shadow-lg shadow-cyan-400/50 p-1 pl-8 pr-8 rounded-xl text-xl'>Edit</button>

        <h2 className='bold text-2xl mb-2 mt-5 underline'>Problem statment</h2>
        <pre className={`border border-zinc-600 p-3 overflow-auto ${codeSize}`}>{codeDetails.problemStatement}</pre>

        <h2 className='bold text-2xl mb-2 mt-8 underline'>Solution</h2>
        <pre className={`border border-zinc-600 p-3 overflow-auto mb-16 ${codeSize}`}>{codeDetails.solution}</pre>

      </div>
    </div>
  );
}

export default withAuth(Code);