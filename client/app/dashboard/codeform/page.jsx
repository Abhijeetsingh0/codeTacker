'use client'
import { useState } from "react";
import axios from "axios";
import {getTokenFromCookie} from "@/app/components/getUserData"
import {useRouter} from 'next/router'
import withAuth from "@/app/components/withAuth";

const CodeForm = () => {
  const [formData, setFormData] = useState({
    quesLink: "",
    programingLanguage: "",
    problemStatement: "",
    solution: "",
    tags: []
  });

  const router = useRouter

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
          alert("code is submitted",response)
          router.push('/dashboard')
      } catch (error) {
          console.error('Something went wrong:', error.response ? error.response.data : error.message);
         } 
      // Handle form submission, e.g., send data to an API
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white text-gray-800 shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Problem Form
      </h1>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-1">Programming Language</label>
          <input
            type="text"
            name="programingLanguage"
            value={formData.programingLanguage}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-1">Question Link</label>
          <input
            type="text"
            name="quesLink"
            value={formData.quesLink}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-1">Problem Statement</label>
          <textarea
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-1">Solution</label>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            rows="20"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center font-semibold shadow-md"
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
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
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
};

export default withAuth(CodeForm);
