const blog = require("../database/model/blog")

module.exports.createBlog = async ({quesId, content, commentId, email}) =>{
    console.log("here")
    try{
        const newBlog = new blog({
            quesId: quesId,
            commentId: commentId,
            content: content,
            email: email
        });
        console.log(newBlog)
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