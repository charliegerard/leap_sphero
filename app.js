//require modules
var express = require('express'),
    path = require('path');

//create web server
var app = express();


//require the module
var test = require('./node_modules/charlie');
test();

// Remember: The order of the middleware matters!

// Everything in public will be accessible from '/'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.all('*', function(req, res){
  res.sendfile('views/index.html');
});

app.listen(3001);
console.log("server running on port 3001");