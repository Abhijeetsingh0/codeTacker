const CodeTracker = require("../database/model/codeTracker")

module.exports.createCodeTracker = async (user ,codeTrackerData) => {
    try {
        // console.log(codeTrackerData);
        const newCodeTracker = new CodeTracker({
            quesLink: codeTrackerData.quesLink,
            problemStatement: codeTrackerData.problemStatement,
            solution: codeTrackerData.solution,
            tags: codeTrackerData.tags,
            email: user.email
        });
        return await newCodeTracker.save();
    } catch (err) {
        console.log("Something went wrong while creating CodeTracker: ", err);
        throw err;  // Rethrow the error for further handling if necessary
    }
};

module.exports.getCodeTrackers = async () => {
    try{
        const CodeTrackers = await CodeTracker.find();
        return CodeTrackers
    }catch (err){
        console.log("somthing went wrong while getCodeTrackers service :",err)
    }
}

module.exports.getCodeTrackerById = async (id) => {
    try{
        return await CodeTracker.findById(id)
    }catch(err){
        console.log("somthing went wrong while getCodeTrackerById service :",err)
    }
}

module.exports.deleteCodeTracker = async (id) => {
    try{
        return await CodeTracker.deleteOne({_id:id})
    }catch(err){
        console.log("somthing went wrong while deleteCodeTracker service :",err)
    }
}

module.exports.putCodeTracker = async (id, newBody) => {
    try{
        console.log(id, newBody)
        const CodeTracker = await CodeTracker.findByIdAndUpdate(
            id, 
            { $set: newBody }, 
            { new: true, useFindAndModify: false }
          );
        console.log(CodeTracker)
        return CodeTracker
    }catch(err){
        console.log("somthing went wrong while putCodeTracker service :",err)
    }
} 