//require modules
var express = require('express'),
    path = require('path');

//create web server
var app = express();

//require the custom module
var test = require('./my_modules/sphero');
test();

// Everything in public will be accessible from '/'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.all('*', function(req, res){
  res.sendfile('views/index.html');
});

app.listen(3001);
console.log("server running on port 3001");




