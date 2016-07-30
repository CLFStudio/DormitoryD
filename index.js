var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mysql = require('mysql'),
    QuesData = require('./data'),
    packUp = require('./tools/index');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));

//Logic
var quesData = new QuesData();
app.get('/questions/get', function(req, res) {
    quesData.getQuestions(function(docs) {
        res.json(docs[docs.length - 1]);
    })
});

app.post('/questions/post', function(req, res) {
    quesData.setQuestions(req.body, function(results) {
        res.json(results.result);
    })
});

app.post('/ans/post', function(req, res) {
    quesData.postAns(req.body, function(results) {
        res.json(results.result);
    })
});

app.get('/ans/get', function(req, res) {
    packUp(function(status) {
        if (status) {
            res.sendFile(path.join(__dirname, 'public/BackUp.csv'));
        }
    });
});

var server = app.listen(80, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});