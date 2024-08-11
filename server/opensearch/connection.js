const { Client } = require("@opensearch-project/opensearch");

//creating connection
module.exports.opensearchConnection = () =>{
    const host = "localhost";
    const protocol = "https";
    const port = 9200;

    const client = new Client({
          node: `${protocol}://${host}:${port}`,
          ssl: {
            rejectUnauthorized: false // Ignore SSL certificate verification
          },
          auth: {
            username: 'admin',
            password: '8871592651@As'
          }
        });
        
    return client 
}
    
