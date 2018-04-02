const express = require('express'),
      path = require('path');
const app = express();
const myModule = require('./sphero_module')();

app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res) => {
  res.sendfile('public/index.html');
});

app.listen(3001);
console.log("server running on port 3001");
