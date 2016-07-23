var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert'),
    config = require('./config');

var QuesData = function () {
}

QuesData.prototype.getQuestions = function (callback) {
    MongoClient.connect(config.mongodbUrl, function(err, db) {
        console.log("ConnectDB");
        db.collection('questions').find({}).toArray(function (err, docs) {
            callback(err, docs);
        });
        db.close();
    });    
}

module.exports = QuesData;