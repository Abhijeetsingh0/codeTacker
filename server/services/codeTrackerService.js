const CodeTracker = require("../database/model/codeTracker")

module.exports.createCodeTracker = async (user ,codeTrackerData) => {
    try {
        // console.log(codeTrackerData);
        const newCodeTracker = new CodeTracker({
            quesLink: codeTrackerData.quesLink,
            problemStatement: codeTrackerData.problemStatement,
            programingLanguage: codeTrackerData.programingLanguage,
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

module.exports.getCodeTrackers = async (email) => {
    try{
        return await CodeTracker.find({email: email});
    }catch (err){
        console.log("somthing went wrong while getCodeTrackers service :",err)
    }
}

module.exports.getCodeTrackerCalender = async (email) => {
    try{
        const response = await CodeTracker.find({email: email});
        return response.map(a=>(a.updatedAt))
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
        const codeTracker = await CodeTracker.findByIdAndUpdate(
            id, 
            { $set: newBody }, 
            { new: true, useFindAndModify: false }
          );
        return codeTracker
    }catch(err){
        console.log("somthing went wrong while putCodeTracker service :",err)
    }
} 