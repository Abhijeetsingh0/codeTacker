const productService = require("../services/productService")

module.exports.createProduct = async (req,res) =>{
    const response = {}    
    try{
        const responseFromService = await productService.createProduct(req.body)
        response.status = 200
        response.message = "Product created successfully"
        response.body = responseFromService
    } catch (err) {
        console.log("Somthing went wrong in product contoller ", err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.getProducts = async (req,res) => {
    const response = {}
    try{
        const products = await productService.getProducts()
        response.status = 200
        response.body = products
    }catch(err){
        console.log("Somthing went wrong in product controller while getProducts :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.getProductById = async (req, res)=>{
    const response = {}
    try{
        const {id} = req.params
        const product = await productService.getProductById(id)
        response.status = 200
        response.body = product
    }catch(err){
        console.log("Somthing went wrong in product controller while getProductById :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.deleteProduct = async (req, res) =>{
    const response = {}
    try{
        const {id} = req.params
        const deleteRes = await productService.deleteProduct(id)
        response.status = 200
        response.body = deleteRes
    }catch(err){
        console.log("Somthing went wrong in product controller while deleteProduct :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}

module.exports.putProduct = async(req, res) => {
    const response = {}
    try{
        const { id } = req.params
        const newBody  = req.body
        const putRes = await productService.putProduct(id, newBody)
        response.status = 200
        response.body = putRes
    }catch(err){
        console.log("Somthing went wrong in product controller while putProduct :",err)
        response.status = 400
        response.message = err.message
        response.body = {}
    }
    return res.status(response.status).send(response)
}