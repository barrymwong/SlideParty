var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  path = require('path');
  

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

app.get('/', function(req, res) {
  var data = '';

  io.sockets.emit('session', req.sessionID);

  if(req.method === 'GET') {

  } else if (req.method === 'POST') {
    req.on('data', function(chunk) {
      console.log(chunk);
      data += chunk;
    });
    req.on('end', function() {
      socket.emit('foo message', data);
    });
  }
  console.log('-->', req.method);
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('disconnect', function() {
  console.log('user disconnected');
});

server.listen(8080);
