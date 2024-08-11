const blog = require("../database/model/blog")

module.exports.createBlog = async ({quesId, title, images,content, commentId, email}) =>{
    try{
        const newBlog = new blog({
            quesId: quesId,
            images: images,
            title:title,
            commentId: commentId,
            content: content,
            email: email
        });
        return await newBlog.save();
    }catch(err){
        console.log("Something went wrong while creating blog: ", err);
        throw err;   
    }
}

module.exports.getBlogs = async ({email} ) => {
    try{
        const blogByEmail = await blog.find({email})
        return blogByEmail
    }catch(err){
        console.log("Somthing went wrong while getting blog by email in services: ", err)
    }
} 

module.exports.getBlogById = async (id) => {
    try{
        const blogById = await blog.findById({_id:id})
        return blogById
    }catch(err){
        console.log("Somthing went wrong while getting blog by ID in service: ", err)
    }
}