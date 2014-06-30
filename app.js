// /*Run this file to serve the index.html file via the Node server*/
// var http = require('http'),
//     fs = require('fs');
// fs.readFile('public/html/index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"}); 
//         response.write(html);  
//         response.end();  
//     }).listen(3000);
// });


var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

// var Leap = require('leapjs');
// var spheron = require('spheron');

// Remember: The order of the middleware matters!

// Everything in public will be accessible from '/'
app.use(express.static(path.join(__dirname, 'public')));

// Everything in 'vendor/thoughtbrain' will be "mounted" in '/public'
// app.use('/public', express.static(path.join(__dirname, 'vendor/thoughtbrain')));

app.use(express.static(path.join(__dirname, 'views')));

app.all('*', function(req, res){
  res.sendfile('views/index.html')
});

http.createServer(app).listen(3000);