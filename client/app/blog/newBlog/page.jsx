'use client'
import { getTokenFromCookie } from "@/app/components/getUserData";
import { useState } from "react";
import Loading from "@/app/components/loading";
import { useRouter } from "next/navigation";
import axios from "axios";
import withAuth from "@/app/components/withAuth";

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
          content: formData.content+" @img("+e.target.files[0].name+") "
        }))
    };

    const removeImage = (imageName) =>{
        const newArray = []
        images.map((image)=>{
            if(image.name != imageName){
                newArray.push(image)
            }
        })
        setImages(newArray)
        setFormData((prev)=>(
            {
                ...prev,
                content: formData.content.replace("@"+imageName,'')
            }
        ))
    }

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
            
            {
                images.length < 1 ? (<div className="mb-4">No image for preview !</div>) : (
                    <div className="grid grid-cols-4 items-end m-8">
                        {
                            images.map((image,index)=>(
                                (<div key={index} className="pr-4">
                                    <img src={URL.createObjectURL(image)}/>
                                    {console.log(index)}
                                    <button className="text-red-500  mt-2" onClick={()=>{removeImage(image.name)}}> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                    <button className="text-teal-500 mt-2 ml-8">
                                        <a href={URL.createObjectURL(image)} target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>                        
                                        </a>
                                    </button>
                                </div>)
                            ))
                        }
                    </div>
                )
            }

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

export default withAuth(newBlog);