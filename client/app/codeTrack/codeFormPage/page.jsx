'use client'
import { useState } from "react";
import axios from "axios";
import {getTokenFromCookie} from "@/app/components/getUserData"
import {useRouter} from 'next/navigation'
import withAuth from "@/app/components/withAuth";
import Loading from "@/app/components/loading";

const CodeForm = () => {
  const [formData, setFormData] = useState({
    quesLink: "",
    programingLanguage: "",
    problemStatement: "",
    solution: "",
    tags: []
  });

  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submission state

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
    // Check if all required fields are filled
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
          const response = await axios.post("http://localhost:8000/codeTracker", formData ,{
              headers: {
                  'Authorization': `Bearer ${getTokenFromCookie}`
              }
          });
          router.push('/dashboard')
      } catch (error) {
          console.error('Something went wrong:', error.response ? error.response.data : error.message);
         } 
      
      //once submitted route to dashboard
      router.push('/dashboard')
      // Handle form submission, e.g., send data to an API
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if(isSubmitting){
    <Loading message={"Submitting...."} />
  }

  return (
    <div className='backdrop-blur-xl h-dvh overflow-auto pb-36'>
    <div className="container px-32 py-16 my-12 ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Save your code
      </h1>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <div className="">
          <label className="block text-gray-700 font-semibold mb-1 ">Programming Language</label>
          <input
            type="text"
            name="programingLanguage"
            value={formData.programingLanguage}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border rounded-xl  shadow-md shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        <div className="">
          <label className="block text-gray-700 font-semibold mb-1">Question Link</label>
          <input
            type="text"
            name="quesLink"
            value={formData.quesLink}
            onChange={handleChange}
            className="mt-1 block w-full p-3  rounded-xl border shadow-md shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        <div className="">
          <label className="block text-gray-700 font-semibold mb-1">Problem Statement</label>
          <textarea
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-lg shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        <div className="">
          <label className="block text-gray-700 font-semibold mb-1">Solution</label>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            rows="20"
            className="mt-1 block w-full p-3 border rounded-xl shadow-lg shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        <div className="p-4">
          <label className="block text-gray-700 font-semibold mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="text-gray-800 px-3 py-1 rounded-xl flex items-center font-semibold shadow-md"
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
          className={`w-64 px-4 py-2 rounded-xl shadow-lg ${
            !isFormValid() || isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition duration-300 ease-in-out`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default withAuth(CodeForm);
