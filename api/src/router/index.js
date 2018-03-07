var express = require('express');
var path = require('path');
var bp = require('body-parser');
var app = express();


var user = require('./user');
var list = require('./list');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bp.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname,'../')));
// app.use(express.static(__dirname + '../../'));
// app.use(express.static(path.join(__dirname,'../')));

module.exports = {
    start: function(_port){
       

        //冯志伟
        list.register(app);
        user.register(app);
        app.listen(_port,function(){
            console.log('连接成功')
        });
    }
}