const CodeTrackerService = require("../services/codeTrackerService")

module.exports.createCodeTracker = async (req,res) =>{
    const response = {}    
    try{
        const responseFromService = await CodeTrackerService.createCodeTracker(req.user,req.body)
        response.status = 200
        response.message = "CodeTracker created successfully"
        response.body = responseFromService
    } catch (err) {
        console.log("Somthing went wrong in CodeTracker contoller ", err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.getCodeTrackers = async (req, res) => {
    const response = {}
    try{
        const user = req.user
        const CodeTrackers = await CodeTrackerService.getCodeTrackers(user.email)
        response.status = 200
        response.body = CodeTrackers
    }catch(err){
        console.log("Somthing went wrong in CodeTracker controller while getCodeTrackers :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.getCodeTrackerCalender = async (req, res) =>{
    const response = {}
    try{
        const user = req.user
        const CodeTrackers = await CodeTrackerService.getCodeTrackerCalender(user.email)
        response.status = 200
        response.body = CodeTrackers
    }catch(err){
        console.log("Somthing went wrong in CodeTracker controller while getCodeTrackers :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.getCodeTrackerById = async (req, res)=>{
    const response = {}
    try{
        const {id} = req.params
        const CodeTracker = await CodeTrackerService.getCodeTrackerById(id)
        response.status = 200
        response.body = CodeTracker
    }catch(err){
        console.log("Somthing went wrong in CodeTracker controller while getCodeTrackerById :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.deleteCodeTracker = async (req, res) =>{
    const response = {}
    try{
        const {id} = req.params
        const deleteRes = await CodeTrackerService.deleteCodeTracker(id)
        response.status = 200
        response.body = deleteRes
    }catch(err){
        console.log("Somthing went wrong in CodeTracker controller while deleteCodeTracker :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.putCodeTracker = async(req, res) => {
    const response = {}
    try{
        
        const { id } = req.params
        const newBody  = {... req.body, email:req.user.email}
        const getCodePost = await CodeTrackerService.getCodeTrackerById(id)
        if(getCodePost.email == req.user.email){
            const putRes = await CodeTrackerService.putCodeTracker(id, newBody)
            response.status = 200
            response.body = putRes
        }else{
            console.log("Can not update other user code")
            response.status = 400
            response.message = "Can not update other user code"
            response.body = {}
        }
        
    }catch(err){
        console.log("Somthing went wrong in CodeTracker controller while putCodeTracker :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}