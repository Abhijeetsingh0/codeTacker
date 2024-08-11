const osConnection =  require("./connection")

module.exports.getAllCodeTracker = async(query) =>{
    
    const connection = osConnection.opensearchConnection() 
    
    const response = await connection.search({
        index: "codetracker",
        body: query,
    })
    return response
}

module.exports.codeTrackerEntryOnOs = async (data) =>{
    const connection = osConnection.opensearchConnection()
    const response = await connection.index({
      index: "codetracker",
      body: data,
      refresh: true,
    });
    return response
}