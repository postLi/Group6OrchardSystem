var db = require('../db/db')

module.exports = {
    register: function(app){
        //得到商品
        app.get('/getAll',function(req, res){
            let pageItems = req.query.pageitems;
            let page = req.query.page;
            let sql = `select 
                    SQL_CALC_FOUND_ROWS 
                    s.type,
                    g.*
                from
                    goods g
                    inner join smalltype s on s.id = g.smalltypeid`;
                   
            if(page && pageItems) {
                sql += ` limit ${(page-1) * pageItems}, ${pageItems}`;
            }
            sql += ";select FOUND_ROWS() as rowscount;";

            db.select(sql, function(data){
                res.send(data);          
            })
        })
        app.post('/updatagoods',function(req, res){
            let _id = req.body.id;
            let _tittle = req.body.title;
            let _price = req.body.price;
            let _qty = req.body.qty;
            let _describes = req.body.describes;
            let sql = `update goods set title = '${_tittle}', price = ${_price},qty =${_qty},describes = '${_describes}' where id = ${_id}`;
            db.update(sql, (result) => {
                // sql = `select * from orders where id = `
                res.send(result);
            })
        })
         //删除商品
        app.post('/delgoods',function(req,res){
            // let ids = req.body.ids;//购物车商品id
            let id = req.body.id;
            console.log(id);
            let sql = `
                    delete 
                        from
                        goods
                    where 
                        id in (${id})`;
                
                
            db.delete(sql,(date)=>{
                res.send(date);
            })
        })

        //添加商品
        app.post('/addgoods',function(req,res){
            var bigtypeid = req.body.bigtypeid;
            var smalltypeid = req.body.smalltypeid;
            var title = req.body.title;
            var qty = req.body.qty;
           
            var describes = req.body.describes || '';
            var price = req.body.price;
            let sql = `
                insert into goods (bigtypeid,smalltypeid,title,qty,describes,price) values (${bigtypeid},${smalltypeid},'${title}',${qty},'${describes}',${price})`
            db.insert(sql,function(data){
                res.send(data)
            })
        })
        //查询
        app.get('/findgoods',function(req,res){
            let pageItems = req.query.pageitems;
            let page = req.query.page;
            console.log(pageItems,page)
            let search = JSON.parse(req.query.search);
            let title = search.title;
            let price = search.price;
            let sql = `select SQL_CALC_FOUND_ROWS  * from goods`;
            if(title && price){
                sql += ` where title Like '%${title}%' and price like '%${price}%'`;
            }else if(title && !price){
                sql += ` where title Like '%${title}%'`;
            }else if(!title && price){
                sql += ` where price Like '%${price}%'`;
            }
            if(page && pageItems) {
                sql += ` limit ${(page-1) * pageItems}, ${pageItems}`;
            }
            sql += ";select FOUND_ROWS() as rowscount;";
            db.select(sql, function(data){
                console.log(data)
                res.send(data);          
            })
        })

        //大类别
        app.get('/findbigtype',function(req, res){
            let bigid = req.query.id;
            console.log(bigid)
            let sql = `
                select 
                                 
                    *    
                from
                    bigtype`;

            db.select(sql, function(data){
                res.send(data);          
            })
        })
        app.get('/findsmalltype',function(req, res){
            
            let sql = `
                select                 
                    *    
                from
                    smalltype
                `;
                   
            db.select(sql, function(data){
                res.send(data);          
            })
        })

    }
}