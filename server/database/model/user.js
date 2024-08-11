const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { use } = require('../../routes/auth');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10,(err,salt)=>{
    if(err){
        return next(err)
    }
    bcrypt.hash(user.password, salt, (err, hash)=>{
        if(err){
            return next(err)
        }
        user.password = hash
        next();
    })
  })
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
   const user = this;
   return new Promise((resolve , reject) => {
    bcrypt.compare(password, user.password, (err, isMatch)=>{
        if(err){
            return reject(err)
        }
        if(!isMatch){
            return reject(false)
        }
        resolve(true)
    })
   })
};

const User = mongoose.model('User', userSchema);

module.exports = User;