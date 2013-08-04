var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path')
  , mongoose = require('./mongoose')
  , fs = require('fs');

var slideData = {};
var pollData = {};

//config for session
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();
var html = fs.readFileSync('./public/index.html');
console.log('dirname-->', __dirname);
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

app.get('/test', function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(html);
}); 

io.sockets.on('connection', function(socket) {
  mongoose.Slide.find({}, function(err, slides) {
    if(err) {
      return err;
    }
    slideData = slides;
  });

  socket.on('initLoad', function(data) {
    data['slideData'] = slideData;
    data['pollData'] = pollData;
    socket.emit('initSuccess', data);
  });

  socket.on('vote', function(data) {
    for(var key in data) {
      var value = pollData[key] || 0;
      pollData[key] = value + data[key];
    }
    io.sockets.emit('voteSuccess', pollData);
  });

  // server listens for direction
  socket.on('direction', function(data) {
    io.sockets.emit('directionSuccess', data);
  });

  socket.on('disconnect', function() {
    console.log('socket.on user disconnected');
  });
});

io.sockets.on('disconnect', function() {
  console.log('io.sockets user disconnected');
});

server.listen(8080);
