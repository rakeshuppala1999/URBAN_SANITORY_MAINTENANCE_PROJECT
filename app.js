/*var http=require('http');
var express = require('express');
const ejs = require('ejs');
var app = express();

var fs=require('fs');
var server = http.createServer(function(req,res){
  
  console.log('request was made: '+req.url);
  //res.writeHead(200,{'Content-Type':'text/html'});
  app.use(express.static('public'));
  app.set('views', './views');
  app.set('view engine', 'ejs');
 
});

app.listen(8019);
app.get('/', function (req, res) {
  res.render('home');
});

//var myReadStream=fs.createReadStream(__dirname + '/html/home.html', 'utf8');
//var publicDir = require('path').join(__dirname,'/code'); 
//app.use(express.static(publicDir)); 



//myReadStream.pipe(res);

server.listen(8019, '127.0.0.1');
console.log('yo now listening yo ')  



/*var http = require('http')

http.createServer(function(req,res){
res.write("welcome back Rakesh")
res.end()
}).listen(8522)  */




//const { static } = require('express')
const express =require('express')
//const { stat } = require('fs')
const app = express()
const port = 8522
const logger = require('morgan');
const path = require('path');
const fileupload = require('express-fileupload')

//const cookieParser =require('cookie-parser');
const bodyParser = require('body-parser');

const mysql = require("mysql");

const dotenv = require('dotenv');
var fileUpload = require('express-fileupload')
dotenv.config( { path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

db.connect( (error) => {
  if(error){
    console.log(error)
  }
  else
  {
    console.log("MYSQL Connected....")
  }
} 

)

app.use(express.static('public'))
app.use('/css',express.static(__dirname+ 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

app.set('public',path.join(__dirname, './public'))

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded( { extended: false}));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs')


//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.use(fileUpload());


app.listen(port, ()=>console.info('Listening on port number  8522'))