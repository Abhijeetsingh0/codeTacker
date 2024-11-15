import axios from "axios"

module.exports.login = async (email, password) =>{
    console.log(email,password,"cdsds")
    try {
        const response = await axios.post('http://localhost:8000/auth/login', {
          email,
          password,
        });  
        const token = response.data.token;
        return token 
    } catch (error) {
        throw new Error("Got error while login: ",error)
    }
}