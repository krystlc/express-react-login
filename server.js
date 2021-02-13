const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/home', function(req, res) {
  res.send(`Let's go!`);
});
app.get('/api/secret', function(req, res) {
  res.send('The password is thewell');
});

app.listen(process.env.PORT || 8080);