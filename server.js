const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const User = require('./backend/User')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api/signin', User.signin)

app.listen(process.env.PORT || 8080);