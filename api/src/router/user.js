var jwt = require('jsonwebtoken');
var db = require('../db/db')
module.exports = {
    register:function(app){
        app.get('/login',function(req,res){
            let username = req.query.username;
            let password = req.query.password;
            console.log(username,password)
            var sql = `select * from admin where username = '${username}' and password='${password}'`;
            db.select(sql,function(data){
                res.send(data)
            })
        });

        app.get('/getuser',function(req, res){
            let pageItems = req.query.pageitems;
            let page = req.query.page;
            let sql = `
                select 
                    SQL_CALC_FOUND_ROWS                         
                    *    
                from
                    admin`;
                   
            if(page && pageItems) {
                sql += ` limit ${(page-1) * pageItems}, ${pageItems}`;
            }
            sql += ";select FOUND_ROWS() as rowscount;";
            db.select(sql, function(data){
                res.send(data);          
            })
        })
        //添加用户
        app.post('/adduser',function(req,res){
            var phone = req.body.phone;
            var username = req.body.username;
            var password = req.body.password;
            var position = req.body.position;
            console.log(phone,username,password,position)
            let sql = `select * from admin where username = ${username}`;
            db.select(sql,function(ress){

                if(ress.data.results.length>0){
                    res.send(ress);
                }else{
                    sql = `
                        insert into admin (phone,username,password,position) values ('${phone}','${username}','${password}','${position}')`
                    db.insert(sql,function(data){
                       
                        res.send(data)
                    })
                }
                
            })
            
        })
        //修改用户
        app.post('/updatauser',function(req,res){
            var id = req.body.id;
            var phone = req.body.phone;
            var username = req.body.username;
            var password = req.body.password;
            var email = req.body.email;
            console.log(id,phone,username,password,email)
            let sql = `
                update admin set phone = '${phone}',username = '${username}',password = '${password}',email = '${email}' where id = ${id}`;

            db.insert(sql,function(data){
                res.send(data)
            })
        })

        //删除用户
        app.post('/deluser',function(req,res){
            // let ids = req.body.ids;//购物车商品id
            let id = req.body.id;
            console.log(id);
            let sql = `
                    delete 
                        from
                        admin
                    where 
                        id in (${id})`;
                
                
            db.delete(sql,(date)=>{
                res.send(date);
            })
        })


        
    }
}