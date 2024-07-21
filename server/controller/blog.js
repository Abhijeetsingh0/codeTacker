const { create } = require("../database/model/blog")
const {createBlog, getBlogs} = require("../services/blog")

module.exports.createBlog = async (req, res) => {
    const response = {}
    const user = req.user
    const data = {...req.body, email: user.email}
    try{
        const responseFromService = await createBlog(data)
        response.status = 200
        response.message = "Blog created successfully"
        response.body = responseFromService
    }catch(err){
        response.meesage = "Somthing went wrong while creating blog "
        response.error = data
        response.status = 400
    }
    return res.status(response.status).send(response)
}

module.exports.getBlogs = async (req, res) => {
    const response = {}
    try{
        const serviceResponse = await getBlogs({email: req.user.email})
        response.status = 200
        response.body = serviceResponse
    }catch(err){
        response.meesage = "Somthing went wrong while geting blog"
        response.error = err
        response.status = 400
    }
    return res.status(response.status).send(response)
}