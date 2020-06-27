const express = require('express');
const path = require('path');
const http = require('http');
//const enforce = require('express-sslify');

const app = express();

//app.use(enforce.HTTPS({trustProtoHeader: true}));
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'), function(err) {
    if (err) {res.status(500).send(err)}
  })
});

app.listen(process.env.PORT || 8080); // Heroku default
