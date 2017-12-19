const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var dateTime = require('node-datetime');
var time = dateTime.create().format('Y/m/d H:M:S');

const app = express();

app.use(express.static('imagse'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'my_db'
});

//Connect
db.connect((err)=>{
    if(err){
        console.log(err);
    }
    console.log('MySQL Connect...');
});


app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.get('/',(req,res)=>{
    var data = "";
    db.query('SELECT * FROM article',(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            console.log('get MySQL aricles ...');
            var data = rows;
        }
        res.render('index',{
            title:'MySQL articles data',
            articles:data
        });
    });
});


app.get('/articles/add',(req,res)=>{
    res.render('add_article',{
        title : 'Add Article'
    });
});

//Get Single Article
app.get('/article/:id',(req,res)=>{
    var data = "";
    db.query(`SELECT * FROM article WHERE id=${req.params.id}`,(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            console.log('get MySQL Single aricle ...');
            var data = rows;
        }
        console.log(data);
        res.render('article',{
            article:data
        });
    });
});

//Get Single Article at edit page
app.get('/article/edit/:id',(req,res)=>{
    var data = "";
    db.query(`SELECT * FROM article WHERE id=${req.params.id}`,(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Edit Single aricle ...');
            var data = rows;
        }
        console.log(data);
        res.render('edit_article',{
            article:data
        });
    });
});


//Add article Sumbit POST
app.post('/articles/add',(req,res)=>{
    let post =  {
        title      :req.body.title,
        category   :req.body.category,
        content    :req.body.content,
        images     :req.body.images,
        publish    :req.body.publish,
        create_date:time
    };
    let sql = 'INSERT INTO article SET ?';
    var add_article = db.query(sql,post,(err,rows)=>{
        if(err){
            console.log(err);
        }
        console.log(post);
        res.setHeader('Content-Type','application/json');
        res.redirect('/');
    });
});

//Update article Sumbit POST
app.post('/articles/edit/:id',(req,res)=>{
    
       let sql = `UPDATE article SET 
                  title   ='${req.body.title}',
                  category='${req.body.category}',
                  content ='${req.body.content}',
                  images  ='${req.body.images}',
                  publish ='${req.body.publish}',
                  publish ='${req.body.publish}' 
                  WHERE id=${req.params.id} `;
       var edit_article = db.query(sql,(err,rows)=>{
           if(err){
               console.log(err);
           }
           console.log(sql);
           res.setHeader('Content-Type','application/json');
           res.redirect('/');
       });
   });

   app.delete('/article/:id',(req,res)=>{
    
       let sql = `DELETE FROM article WHERE id=${req.params.id} `;
       var delete_article = db.query(sql,(err,rows)=>{
           if(err){
               console.log(err);
           }
           res.send('Success');
       });
   });


var server = app.listen(8080, function () {
    
    console.log('Sever start port : 8080');
});