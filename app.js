const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var dateTime = require('node-datetime');
var time = dateTime.create().format('Y/m/d H:M:S');

const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'data_bace'
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
        res.render('index',{
        title:'MySQL history data'       
    });
    
});


//Get ajax
app.get('/data/:id',(req,res)=>{
    
    db.query(`SELECT * FROM history LIMIT ${req.params.id},5`,(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            console.log('get MySQL five datas ...');
            data = rows;
            console.log(data);
            res.send(data);
            }
    });
});

app.set('/data/:id',(req,res)=>{
    console.log('new files');
    res.render('data')
});


var server = app.listen(8080, function () {
    console.log('Sever start port : 8080');
});