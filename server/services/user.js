const User =  require("../database/model/user")
const CodeTracker = require("../database/model/codeTracker")

module.exports.deleteUser =  async (id) => {
    try{      
        const user = await User.findById({_id:id})
        const delCode = await CodeTracker.deleteMany({email:user.email})
        const delUser = await User.findByIdAndDelete({_id:id})
        return delUser,delCode

    }catch(err){
        console.log("somthing went wrong while in userDelete service :",err)
    }
}

module.exports.getAllUsers = async () => {
    try{
        return await User.find()
    }catch(err){
        console.log("somthing went wrong while in getAllUsers service :",err)
    }
} 