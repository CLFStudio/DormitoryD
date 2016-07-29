var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    fs = require('fs'),
    csvWriter = require('csv-write-stream');
    config = require('../config');

var fileName = "public/BackUp.csv";

var exportData = function(){
    function toCsv(docs) {
        var headersData=[];
        for(d in docs[0]){
            headersData.push(d);
        }
        var writer = csvWriter({headers:headersData});
        writer.pipe(fs.createWriteStream(fileName));
        for(doc in docs){
            var bodys=[];
            for(body in docs[doc]){
                bodys.push(docs[doc][body]);
            }
            writer.write(bodys);
        }
        writer.end();
    }

    MongoClient.connect(config.mongodbUrl, function(err, db) {
        console.log("ConnectDB");
        db.collection('ans').find({}).toArray(function(err, docs) {
            db.close();
            toCsv(docs);
        });
    });
}

module.exports = exportData;
