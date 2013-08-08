var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path')
  , mongoose = require('./mongoose')
  , _und = require('underscore')
  , fs = require('fs');

var slideData = {};
var pollData = {};
var isAdmin = {};

//config for session
var MemoryStore = express.session.MemoryStore;
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    store: new MemoryStore(),
    secret: 'secret',
    cookie: {httpOnly: false},
    key: 'cookie.sid'
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname + '/public')));
});

io.sockets.on('connection', function(socket) {
  var checkAuth = function(req, res, next) {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  var getSlideData = function() {
    mongoose.Slide.find({}, function(err, slides) {
      if(err) {
        return err;
      }
      slideData = slides;
    });
    return slideData;
  };
  getSlideData();

  app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
  });

  app.get('/edit', checkAuth, function (req, res) {
    res.sendfile('./public/edit.html');
  });

  app.post('/edit', checkAuth, function (req, res) {
    new mongoose.Slide(req.body.edit).save(function(err, slide) {
      if(err) {
        return err;
      }
      io.sockets.emit('slideUpdateSuccess', slide);
    });
    res.end('done');
  });

  app.get('/login', function (req, res) {
    res.sendfile('./public/login.html');
  });

  app.post('/login', function (req, res) {
    var post = req.body;
    if (post.login.username === 'admin' && post.login.password === '1234') {
      req.session.user_id = 'admin';
      res.cookie('isAdmin', 1000);
      isAdmin['isAdmin'] = 1000;
      if(post.login.nav === 'new') {
        res.redirect('/edit');
      } else {
        res.redirect('/');
      }
      io.sockets.emit('hijackSuccess', {noHijack: false});
    } else {
      res.send('Bad user/pass');
    }
  });

  app.get('/logout', function (req, res) {
    delete req.session.user_id;
    isAdmin = {};
    res.clearCookie('isAdmin');
    io.sockets.emit('hijackSuccess', {noHijack: true});
    res.redirect('/login');
  });      

  socket.on('initLoad', function(data) {
    var getData = getSlideData();
    data['slideData'] = getData;
    data['pollData'] = pollData;
    data['isAdmin'] = isAdmin;
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
