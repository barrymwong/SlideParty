var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path')
  , mongoose = require('./mongoose');

var slideData = {};

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

app.get('/', function (req, res) {
  res.writeHead(200);
  res.send('admin page');
  res.end();
}); 

app.get('/admin', function (req, res) {
  res.send('admin page');
}); 

io.sockets.on('connection', function(socket) {

  socket.on('init', function(data) {
    mongoose.Slide.find({}, function(err, slides) {
      if(err) {
        return err;
      }
      slideData = slides;
    });

    data['slideData'] = slideData;
    io.sockets.emit('initSuccess', data);
  });

  // server listens for direction
  socket.on('direction', function(data) {
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
