var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  path = require('path');

  // mongo = require('mongodb'),
  // Db = mongo.Db,
  // DbServer = mongo.Server;

  // dbClient = new Db('test', new DbServer('127.0.0.1', 27017), {safe:false});

  // var insertData = function(err, collection) {
  //   var count = collection.count(function(err, total) {
  //     return total;
  //   });

  //   if(0 < count) {
  //     collection.insert({title: 'My Presentation'});
  //     collection.insert({image: 'http://barrymwong.com/images/pacific_ave.jpg'});
  //     collection.insert({image: 'http://mathblag.files.wordpress.com/2011/11/fibonacci_pigeons.jpg'});
  //     collection.insert({image: 'https://i.chzbgr.com/maxW500/7670554368/hA827CEEC/'});
  //     collection.insert({title: 'Hello Wrrld!!!'}); 
  //     collection.insert({title: 'Errmergerrd!'});
  //   }
  // };

  // dbClient.open(function(err, pClient) {
  //   dbClient.collection('test_insert', insertData);
  // });

// config for session
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();
app.configure(function() {
  app.use(express.static(path.join(__dirname + '/public')));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    store: sessionStore,
    secret: 'secret',
    cookie: {httpOnly: false},
    key: 'cookie.sid'
  }));
  app.use(app.router);
});

io.sockets.on('connection', function(socket) {

  // server listens for direction
  socket.on('direction', function(data) {
    console.log('direction', data);
    io.sockets.emit('directionSuccess', data);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

io.sockets.on('disconnect', function() {
  console.log('user disconnected');
});

server.listen(8080);
