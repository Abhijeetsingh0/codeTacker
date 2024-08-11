var { Client } = require("@opensearch-project/opensearch");
var fs = require("fs");
const documents = require('./docs.json');


//creating connection
var host = "localhost";
var protocol = "https";
var port = 9200;

var client = new Client({
  node: `${protocol}://${host}:${port}`,
  ssl: {
    rejectUnauthorized: false // Ignore SSL certificate verification
  },
  auth: {
    username: 'admin',
    password: '8871592651@As'
  }
});

//get the opensearch cluster information
client.info()
  .then(response => console.log(response))
  .catch(err => console.error('Error during info request:', err));

// creating indices

// client.indices.create({index: "codetracker"})
  // .then(response => console.log(response))
  // .catch(err => console.error('Error during creating indices:', err));

  const docs = [
    { title: 'Beauty and the Beast 1', year: 2050 },
    { title: 'Beauty and the Beast 2', year: 2051 },
  ];
  
  client.helpers
    .bulk({
      datasource: docs,
      onDocument(_) {
        return { index: { _index: "codetracker" } };
      },
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err)=>{
      console.log("error while entring data in opensearch, ",err)
    })