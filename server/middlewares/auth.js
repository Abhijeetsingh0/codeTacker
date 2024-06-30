const jwt = require('jsonwebtoken')
const User = require('../database/model/user');
const { json } = require('body-parser');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token){
        return res.status(401).json({message:'Authentication required'});
    }
    try{
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decodeToken.emailId);
        if (!user){
            return res.status(404).json({message: 'User not found'})
        }
        req.user = user;
        next();
    }catch (err){
        req.status(401).json({message:'Invalid token'})
    }
}

const adminAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token){
        return res.status(401).json({message:'Authentication required'})
    }
    try{
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decodeToken.emailId);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        if (user.role != "admin"){
            return res.status(404).json({message: "User is not Admin"})
        }
        req.user = user
        next()
    }catch(err){
        res.status(401).json({message:'Invalid token'})
    }
}

module.exports = {authenticate, adminAuth}

// 
// {
    // "_id": {
    //   "$oid": "667b2ce2a935153f49e8a6c9"
    // },
    // "username": "test",
    // "email": "test@gmail.com",
    // "password": "$2b$10$Zvw3f9EHyXuVZ9beOLrpoez79EKY9Xpwej4RsjcM9r/P75rwkLGf.",
    // "role": "user",
    // "createdAt": {
    //   "$date": "2024-06-25T20:47:30.323Z"
    // },
    // "updatedAt": {
    //   "$date": "2024-06-25T20:47:30.323Z"
    // },
    // "__v": 0
//   }