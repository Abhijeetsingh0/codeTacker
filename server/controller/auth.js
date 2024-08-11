const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../database/model/user')

const register = async (req, res, next) =>{
    const {username, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password : hashedPassword});
        await user.save();
        res.status(200).json({message:'Registration successful'})
    }catch(err){
        console.log(err)
        next(err);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(email,password)
    try {
       const email_ = await User.findOne({ email });
      if (!email_) {
        return res.status(404).json({ message: 'email not found' });
      }
  
      const passwordMatch = await email_.comparePassword(password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ emailId: email_._id }, process.env.SECRET_KEY, {
        expiresIn: '1 hour'
      });
      res.json({token});
    } catch (err) {
      next(err);
    }
  };
  
module.exports = {register, login};