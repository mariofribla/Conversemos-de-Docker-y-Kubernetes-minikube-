var express = require('express');
var auth = require('basic-auth')

var app = express();

var root = {
    msg: "ApiRest prueba HTTPS",
};

var public = {
    public_token: "12837asd98a7sasd97a9sd7",
};

var private = {
    private_token: "TWFudGVuIGxhIENsYW1hIHZhcyBtdXkgYmllbgo=",
};

app.get('/', function (req, res) {
  res.send(root);
});

app.get('/public', function (req, res) {
  res.send(public);
});

app.get('/private', function (req, res) {
  var acceso = auth(req)
  if (acceso === undefined || acceso['name'] !== 'sacaci' || acceso['pass'] !== 'chile') {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Reto-Devops"');
    res.end('Unauthorized');
  } else {
    res.send(private);
  }
});

app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!');

});
