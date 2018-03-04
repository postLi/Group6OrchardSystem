var jwt = require('jsonwebtoken');
var db = require('../db/db')
module.exports = {
    register:function(app){
        // app.post('/register',function(req,res){
        //     db.select('user',{'username':req.body.username},function(_result){
        //         if(_result.status && _result.data.length > 0){
        //             res.send(apiResult(false,_result.data));
        //         }else if(_result.status && _result.data.length == 0){
        //             db.insert('user',req.body,function(_result){
        //                 if(_result.status && _result.data.result.n === 1){
        //                     res.send(apiResult(true,_result.data.ops));
        //                 }else{
        //                     res.send(apiResult(false,{'err':'error'}));
        //                 }
        //             })
        //         }else{
        //             res.send(apiResult(false,{'err':'error'}));
        //         }
        //     })
        // });
        // app.get('/validate',function(req,res){
        //     let username = req.query.username;
        //     var sql = `select * from user where username = ${username}`;
        //     db.select(sql,function(data){
        //         res.send(data);
        //     })
        // })
        app.get('/login',function(req,res){
            let username = req.query.username;
            let password = req.query.password;
            console.log(username,password)
            var sql = `select * from user where username = '${username}' and password='${password}'`;
            db.select(sql,function(data){
                console.log(data)
                res.send(data)
            })
            // db.select('user',function(_result){
            //     console.log(_result)
                // if(_result.status && _result.data.length > 0){
                //     var token = jwt.sign({username : req.query.username},'secret',{
                //             expiresIn: 999
                //         });
                //     console.log('ok')
                //     res.send(_result.status,{'token':token}));
                // }else{
                //     console.log('fail')
                //     res.send(apiResult(false,_result.data));
                // }
            // });
        });
        // app.post('/delUser',function(req,res){
        //     db.delete('user',req.body,function(_result){
        //         if(_result.status && _result.data.result.n === 1){
        //             res.send(apiResult(true,_result.data));
        //         }else{
        //             console.log('fail')
        //             res.send(apiResult(false,_result.data));
        //         }
        //     });
        // });
        // app.post('/upUser',function(req,res){
        //     db.upload('user',req.body,function(_result){
        //         if(_result.status && _result.data.result.n === 1){
        //             console.log('ok');
        //             res.send(apiResult(true,_result.data));
        //         }else{
        //             console.log('fail')
        //             res.send(apiResult(false,_result.data));
        //         }
        //     })
        // });
        /*-------------------------------登录时验证token--------------*/

        // app.post("/index",function(req,res){
   
        //     var token = req.headers.authorization;
        //     //console.log(req.headers)
        //     jwt.verify(token,"secret",function(error,result){
        //         if(error){
        //             res.send(error);
        //         }else{
        //             res.send(result);
        //         }
        //     })
        // });
    }
}