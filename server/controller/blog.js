const { createBlog, getBlogs } = require("../services/blog");
const { uploadToMinIO } = require("../minio");

module.exports.createBlog = async (req, res) => {
    const response = {};
    const user = req.user;
    const files = req.files;
    const imageUrl = files ? await Promise.all(files.map(file => uploadToMinIO(file.path, file.filename, user.email))) : [];
    const data = { ...req.body, email: user.email, images: imageUrl };
    try {
        const responseFromService = await createBlog(data);
        response.status = 200;
        response.message = "Blog created successfully";
        response.body = responseFromService;
    } catch (err) {
        response.message = "Something went wrong while creating blog";
        response.error = err;
        response.status = 400;
    }

    return res.status(response.status).send(response);
};

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