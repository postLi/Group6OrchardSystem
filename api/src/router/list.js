var db = require('../db/db')

module.exports = {
    register: function(app){
        app.get('/getgoodslist', function(req, res){
            var keyword = req.query.keyword;
            var type = req.query.type;
            var dec = req.query.desc;
            var sql = `
                select                           
                    g.*
                from
                    goods g 
                    inner join bigtype b on g.bigtype = b.id
                where
                    type = '${keyword}'
            `;
            if(type == '销量'){
                console.log(dec)
                if(dec == 'false'){
                  
                    sql +='order by saleqty desc';
                }else{  
                   
                    sql +='order by saleqty asc';
                }
            }else if(type == '价钱'){
                if(dec == 'false'){
                    sql+='order by saleprice desc';
                }else{
                    sql+='order by saleprice asc'
                }
            }
            db.select(sql, function(data){
               
                res.send(data);
            })
        })
        app.get('/getdetails',function(req, res){
            var goodid = req.query.gid;
            var sql = `
            select                           
                *
            from
                goods 
            where
                id = ${goodid}
            `;   
            db.select(sql, function(data){
               
                    res.send(data);
                
            })
        })
        app.post('/comment',function(req, res){
            var gid = req.body.goodsId;
        
            var sql = `
                select 
                    gr.*,                          
                    g.*,
                    u.username
                from
                    
                    grade gr
                    inner join goods g  on g.id = gr.gid
                    inner join users u on gr.userid = u.id
                where 
                    gr.gid = gid`;
            db.select(sql, function(data){
                res.send(data);
                
            })
        })

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

        // app.get('/getUser',function(req, res){
        
        //     var sql = `
        //         select                          
        //             *   
        //         from
        //             users`
                   
        //     db.select(sql, function(data){
        //         res.send(data);
                
        //     })
        // })
        /*------------分页-------------------*/
        // app.get('/getcommodity',function(req,res){
        //     var keyword = req.query.keyword;
        //     var limit = req.query.limit * 1;
        //     var page = req.query.page * 1;
        //     console.log(limit,page)
        //     var sql = `
        //         select
        //             SQL_CALC_FOUND_ROWS
        //             *
        //         from
        //             goods
        //             where type = '${keyword}'
        //             limit ${(page - 1) * limit}, ${limit};
        //             select FOUND_ROWS() as rowscount;
        //     `;
        //     db.select(sql, function(data){
        //         console.log(data)
        //         res.send(data);
        //     })
        // })
        /*------------------搜索-------------------*/
        // app.get('/seek',function(req,res){
        //     var seekkeyword = req.query.keyword;
        //     console.log(seekkeyword)
        //     var limit = req.query.limit * 1;
        //     var page = req.query.page * 1;
        //     var sql = `
        //         SELECT
        //             SQL_CALC_FOUND_ROWS
        //             * 
        //             FROM
        //         goods WHERE title LIKE  '%${seekkeyword}%' 
        //         limit ${(page - 1) * limit}, ${limit};
        //         select FOUND_ROWS() as rowscount;
        //         `;
        //     db.select(sql, function(data){
        //         // console.log(data)
        //         res.send(data);
        //     })
        // })
        /*------------------所有---------------*/
        // app.get('/getall',function(req,res){
        //     // var seekkeyword = req.query.keyword;
        //     // console.log(seekkeyword)
        //     var limit = req.query.limit * 1 || 10;
        //     var page = req.query.page * 1 || 1;
        //     var sql = `
        //         SELECT
        //             SQL_CALC_FOUND_ROWS
        //             * 
        //             FROM
        //         goods
        //         limit ${(page - 1) * limit}, ${limit};
        //         select FOUND_ROWS() as rowscount;
        //         `;
        //     db.select(sql, function(data){
        //         // console.log(data)
        //         res.send(data);
        //     })
        // })

        // app.get('/getdetails',function(req, res){
        //     var goodid = req.query.gid;
        //     var sql = `
        //     select                           
        //         g.*
        //     from
        //             goods g 
        //             inner join grade gr on g.id = gr.id
        //     where
        //         id = ${goodid}
        //     `;   
        //     db.select(sql, function(data){
        //         console.log(data.data.results)
        //         if(data.data.results.length<=0){  
        //             sql = `select * from goods where id = ${goodid}`
        //             db.select(sql,function(data){
        //                 res.send(data);
        //             })
        //         }else{
        //             res.send(data);

        //         }
                
        //     })
        // })
    }
}