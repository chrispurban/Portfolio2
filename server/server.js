const config = require('./config');
const express = require('express');
const path = require('path');
const http = require('http');
const enforce = require('express-sslify');

const mongoose = require('mongoose');
const app = express();

console.log(
  '╔═══════════════════╗\n║ HELLO we are LIVE ║ ' + new Date().toLocaleTimeString() + '\n╚═══════════════════╝'
);

mongoose
  .set('useNewUrlParser', true)
  .set('useUnifiedTopology', true)
  .connect(process.env.DB_URI)
  .then(
    (db) => {console.log('Connected correctly to MongoDB');},
    (err) => {console.log(err);}
  )
;

app
  .use(enforce.HTTPS({trustProtoHeader: true}))
  .use(express.static(path.join(__dirname, '../dist')))
  .use('/api/projects', require('./routes/projectrouter'))
  .use('/api/tasks', require('./routes/taskrouter'))
;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {res.status(500).send(err)}
  })
});

app.listen(
  process.env.PORT || 8080 // Heroku default
);
