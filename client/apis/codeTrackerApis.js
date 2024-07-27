import { getTokenFromCookie } from "@/app/components/getUserData";
import axios from "axios";

module.exports.fetchCodeTrack = async () => {
    const token = getTokenFromCookie;
    try {
      const response = await axios.get('http://localhost:8000/codeTracker/', {
        headers: {
          'authorization': `Bearer ${token}`, // Correct spelling of "Bearer"
        },
      });
      return response.data.body
    } catch (error) {
        throw new Error("Got error while fetching CodeTracker: ",error)
    }
};

module.exports.postCodeTracker = async (formData) =>{
  try {
    const response = await axios.post("http://localhost:8000/codeTracker", formData ,{
        headers: {
            'Authorization': `Bearer ${getTokenFromCookie}`
        }
    });
    return response
  } catch (error) {
      throw new Error('Something went wrong:', error.response ? error.response.data : error.message);
     } 
}

module.exports.deleteCodeTrack = async (id) => {
  try{
    const response = axios.delete(`http://localhost:8000/codeTracker/${id}`,{
      headers:{
        Authorization: `Bearer ${getTokenFromCookie}`,
      }
    })
    return response
  }catch(err){
    throw new Error(`somthing went wrong while deleteing code id ${id} with error ${err}`)
  }
}

module.exports.fetchCodeDetails = async (id) => {
  try {
    const response = axios.get(`http://localhost:8000/codeTracker/${id}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie}`,
      },
    });
  
    return response
  } catch (err) {
    throw new Error('something went wrong while fetching the code details with _id :', err);
  }
};

module.exports.putCodeTracker = async (formData,id) =>{
  try {
    const response = await axios.put(`http://localhost:8000/codeTracker/${id}`, formData ,{
        headers: {
            'Authorization': `Bearer ${getTokenFromCookie}`
        }
    });
    return response
  } catch (error) {
    throw new Error('Something went wrong:', error.response ? error.response.data : error.message);
   } 
}