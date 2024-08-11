import { getTokenFromCookie } from "@/app/components/getUserData";
import axios from "axios";

module.exports.postBlog = async (data) =>{
    try {
        const response = await axios.post("http://localhost:8000/blog", data, {
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response
    } catch (error) {
        throw new Error('Something went wrong:', error.response ? error.response.data : error.message);
    } 
}

module.exports.fetchBlog = async (id) =>{
    try{
        const response = axios.get(`http://localhost:8000/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${getTokenFromCookie}`,
            },
          });
        return (await response).data.body
    }catch(err){
        throw new Error("Somthing went wrong while fetching the blog data: ",err)
    }
}