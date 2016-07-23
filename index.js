var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mysql = require('mysql'),
    Data = require('./data');

var ques = new Data();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));

app.get('/getques',function(req, res){
    var ques = new Data();
    ques.getQuestions(function(err, docs){
        if(!err)
            res.end(docs[docs.length-1]);
    });
});

app.post('/ans', function(req, res) {
    _pool.getConnection(function(err, conn) {
        if (!err) {
            var data = [req.body['0'], req.body['1'], req.body['2'], req.body['3']];
            conn.query('INSERT INTO `lab`.`datas` (`0`, `1`, `2`, `3`) VALUES (?,?,?,?)', data, function(err) {
                if (!err) {
                    res.end('1');
                    conn.release();
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
});

app.post('/ques', function(req, res) {
    var data = req.body;
    MongoClient.connect(config.mongodbUrl, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('questions');
        collection.insert(data,function(err,results){
            if(!err) res.end('1');
            else console.log(err);
        })
        db.close();
    });
});

var server = app.listen(5000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});