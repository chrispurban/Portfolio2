const config = require('./config')
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const http = require('http');
//const enforce = require('express-sslify');

const mongoose = require('mongoose');
const app = express();

mongoose
  .set('useNewUrlParser', true)
  .set('useUnifiedTopology', true)
  .connect(config.dba)
  .then(
    (db) => {console.log('Connected correctly to '+config.dbn);},
    (err) => {console.log(err);}
  )
;

//app.use(enforce.HTTPS({trustProtoHeader: true}));
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'), (err) => {
    if (err) {res.status(500).send(err)}
  })
});

app.listen(process.env.PORT || 8080); // Heroku default
