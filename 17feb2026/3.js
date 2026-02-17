const promise = require('promise');
const Mongoclient = require('mongodb').MongoClient;

const url = 'mongodb://localhost/TestDB';
Mongoclient.connect(url)
  .then(function(err,db){
    db.collection('TestCollection').updateone({"Name" :"joe"
    },
    {
          $set: {
            "Name": "Beck",
          }
    });
    })

    .catch(error => alert(error.message));