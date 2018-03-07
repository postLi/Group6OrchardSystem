var db = require('../db/db')

module.exports = {
    register: function(app){
        //得到商品
        app.get('/getAll',function(req, res){
            let pageItems = req.query.pageitems;
            let page = req.query.page;
            let sql = `
                select 
                    SQL_CALC_FOUND_ROWS                         
                    *    
                from
                    goods`;
                   
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
            var title = req.body.title;
            var qty = req.body.qty;
            var saleprice = req.body.saleprice;
            var describes = req.body.describes;
            var price = req.body.price;
            var data = req.body.data;
            let sql = `
                insert into goods (title,qty,saleprice,describes,price) values ('${title}',${qty},${saleprice},'${describes}',${price})`
            db.insert(sql,function(data){
                res.send(data)
            })
        })

    }
}