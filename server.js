
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

// config for session
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();
app.configure(function() {
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

  socket.on('message', function(data) {
    var reply = 'Hello,' + data.name + '! Is this what you said: "' + data.message + '"?';
    io.sockets.emit('messageSuccess', reply);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

});


app.get('/', function(req, res) {

  // session id
  console.log('session: ', req.sessionID);

  var data = '';
  if(req.method === 'GET') {
    io.sockets.emit('session', req.sessionID);

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
