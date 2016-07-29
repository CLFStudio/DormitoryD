var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    config = require('./config');

var QuesData = function() {

}

QuesData.prototype.getQuestions = function(callback) {
    MongoClient.connect(config.mongodbUrl, function(err, db) {
        console.log("ConnectDB");
        db.collection('questions').find({}).toArray(function(err, docs) {
            db.close();
            if(!err) callback(docs);
        });
    });
}

QuesData.prototype.setQuestions = function(ques, callback) {
    MongoClient.connect(config.mongodbUrl, function(err, db) {
        console.log("ConnectDB");
        db.collection('questions').insert(ques, function(err, results) {
            db.close();
            if(!err) callback(results); 
        });
    });
}

QuesData.prototype.postAns = function (ans, callback) {
    MongoClient.connect(config.mongodbUrl, function (err, db) {
        console.log("ConnectDB");
        db.collection('ans').insert(ans, function(err, results) {
            db.close();
            if(!err) callback(results); 
        });
    });
}

QuesData.prototype.getAns = function (callback) {
    MongoClient.connect(config.mongodbUrl, function (err, db) {
        console.log("ConnectDB");
        db.collection('ans').find({}).toArray(function(err, docs) {
            db.close();
            if(!err) callback(docs);
        });
    });
}

module.exports = QuesData;