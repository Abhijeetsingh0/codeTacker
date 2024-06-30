const userService = require("../services/user")

module.exports.deleteUser = async (req, res) => {
    const response = {}
    try{
        const delUser = await userService.deleteUserService(req.params)
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