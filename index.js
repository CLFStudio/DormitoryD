var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mysql = require('mysql'),
    mongoose = require('mongoose'),
    db = mongoose.createConnection('localhost','data'),
    _pool = mysql.createPool({
        host: 'localhost',
        port: '3306',
        user: 'laber',
        password: 'laber',
        database: 'lab'
    });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+'/public')));

app.post('/ans', function (req, res) {
    _pool.getConnection(function (err, conn) {
        if (!err) {
            var data = [req.body['0'],req.body['1'],req.body['2'],req.body['3']];
            conn.query('INSERT INTO `lab`.`datas` (`0`, `1`, `2`, `3`) VALUES (?,?,?,?)',data,function(err){
                if(!err){
                    res.end('1');
                    conn.release();
                }else{
                    console.log(err);
                }
            });
        }else{
            console.log(err);
        }
    });
});

app.post('/ques', function(req, res){
    var Questions = new mongoose.Schema({
        questions:[]
    });
    var QuestionsModel = db.model('questions',Questions);
    var questions = new QuestionsModel({questions:req.body});
    questions.save();
    res.end('1');
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});