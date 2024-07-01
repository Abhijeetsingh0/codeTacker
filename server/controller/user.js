const UserService = require("../services/user")

module.exports.deleteUser = async (req, res) => {
    const response = {}
    try{
        const delUser = await UserService.deleteUser(req.params.id)
        response.status = 200
        response.message = "User : "+req.user.username+", email: "+req.user.email+" is removed with all code-track"
        response.body = delUser
    }catch(err){    
        console.log("somthing went wrong in deleteUser controller :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.getAllUsers = async (req, res) => {
    const response = {}
    try{
        const allUsers = await UserService.getAllUsers()
        response.status = 200
        response.body = allUsers
    }catch(err){
        console.log("somthing went wrong in getAllUser controller :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
} 

module.exports.getUser = async (req, res) => {
    const response = {}
    try{
        response.status = 200
        response.body = req.user
    }catch(err){    
        console.log("somthing went wrong in getUser controller :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}