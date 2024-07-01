const User =  require("../database/model/user")

module.exports.deleteUser =  async (email, id) => {
    try{
        await deleteAllTrackForUserHelper(email)
        const delUser = await User.deleteOne({_id:id})
    }catch(err){
        console.log("somthing went wrong while in userDelete service :",err)
    }
    return delUser
}

const deleteAllTrackForUserHelper =  async (email) => {
    try{
        const deleteAllTrackForUser = await User.deleteMany({email:email})
    }catch(err){
        console.log("somthing went wrong while in deleteAllTrackForUserHelper service :",err)
    }
}

module.exports.getAllUsers = async () => {
    try{
        return await User.find()
    }catch(err){
        console.log("somthing went wrong while in getAllUsers service :",err)
    }
} 