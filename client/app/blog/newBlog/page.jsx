'use client'
import { getTokenFromCookie } from "@/app/components/getUserData";
import { useState } from "react";
import Loading from "@/app/components/loading";
import { useRouter } from "next/navigation";
import axios from "axios";

const newBlog = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        quesId: "",
        commentId: "demo Id",
    });
    const [images, setImages] = useState([]);
    
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        // const files = Array.from(e.target.files);
        setImages([...images,e.target.files[0]]);
        setFormData((prev)=>({
          ...prev,
          content: formData.content+" @"+e.target.files[0].name+" "
        }))
        console.log("Files selected:", e.target.files[0] );
    };

    const isFormValid = () => {
        return formData.title.trim() && formData.content.trim();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setIsSubmitting(true);

            if (!getTokenFromCookie) {
                alert('Please login');
                router.push('/auth/login');
                return;
            }

            const data = new FormData();
            data.append('title', formData.title);
            data.append('content', formData.content);
            data.append('quesId', formData.quesId);
            data.append('commentId', formData.commentId);
            images.forEach((image) => {
                data.append('images', image);
            });

            console.log("FormData before sending request:", data);

            try {
                const response = await axios.post("http://localhost:8000/blog", data, {
                    headers: {
                        'Authorization': `Bearer ${getTokenFromCookie}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                router.push('/blog');
            } catch (error) {
                alert('Something went wrong:', error.response ? error.response.data : error.message);
                console.error('Something went wrong:', error.response ? error.response.data : error.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (isSubmitting) {
        return <Loading message={"Submitting..."} />;
    }

    return (
        <div className="container mt-4 mb-8 pl-32 pr-32 pb-16 pt-8">
            <h1 className="text-3xl font-bold mb-6 text-center">New Blog</h1>
            <form className="space-y-6 rounded-lg" onSubmit={handleSubmit}>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <label className="block text-gray-700 font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 rounded-xl bg-white shadow-lg shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        required
                    />
                    <label className="block text-gray-700 font-semibold mt-4">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="20"
                        className="mt-1 block w-full p-3 rounded-xl bg-white shadow-lg shadow-gray-400/50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        required
                    />
                    <label className="block text-gray-700 font-semibold mt-8">Upload Image</label>
                    <label className="block mt-2">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            name='images'
                            onChange={handleImageChange}
                            multiple
                            className="block w-full text-sm text-slate-500 
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-zinc-300 file:text-gray-700
                              hover:file:bg-zinc-500"
                        />
                    </label>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={!isFormValid() || isSubmitting}
                            className={`px-8 py-2 rounded-xl font-semibold shadow-lg mt-8 ${
                                !isFormValid() || isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            } transition duration-300 ease-in-out`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default newBlog;
