var Server = {};
Server.express = require('express');
Server.app = Server.express();
Server.http = require('http').createServer(Server.app);
Server.io = require('socket.io').listen(Server.http);
Server.path = require('path');
Server.mongoose = require('./mongoose');
Server.data = {};
Server.data.slideData = {};
Server.data.pollData = {};
Server.data.isAdmin = {};

//config for session
Server.MemoryStore = Server.express.session.MemoryStore;
Server.app.configure(function() {
  Server.app.use(Server.express.bodyParser());
  Server.app.use(Server.express.cookieParser());
  Server.app.use(Server.express.session({
    store: new Server.MemoryStore(),
    secret: 'secret',
    cookie: {httpOnly: false},
    key: 'cookie.sid'
  }));
  Server.app.use(Server.app.router);
  Server.app.use(Server.express.static(Server.path.join(__dirname + '/public')));
});

Server.io.sockets.on('connection', function(socket) {
  var checkAuth = function(req, res, next) {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  var getSlideData = function() {
    Server.mongoose.Slide.find({}, function(err, slides) {
      if(err) {
        return err;
      }
      Server.data.slideData = slides;
    });
    return Server.data.slideData;
  };
  getSlideData();

  Server.app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
  });

  Server.app.get('/create', checkAuth, function (req, res) {
    res.sendfile('./public/create.html');
  });

  Server.app.post('/create', checkAuth, function (req, res) {
    new Server.mongoose.Slide(req.body.create).save(function(err, slide) {
      if(err) {
        return err;
      }
      Server.io.sockets.emit('slideUpdateSuccess', slide);
    });
    res.end('done');
  });

  Server.app.get('/login', function (req, res) {
    res.sendfile('./public/login.html');
  });

  Server.app.post('/login', function (req, res) {
    var post = req.body;
    if (post.login.username === 'admin' && post.login.password === '1234') {
      req.session.user_id = 'admin';
      res.cookie('isAdmin', 1000);
      Server.data.isAdmin['isAdmin'] = 1000;
      if(post.login.nav === 'new') {
        res.redirect('/create');
      } else {
        res.redirect('/');
      }
      Server.io.sockets.emit('hijackSuccess', {noHijack: false});
    } else {
      res.send('Bad user/pass');
    }
  });

  Server.app.get('/logout', function (req, res) {
    delete req.session.user_id;
    Server.data.isAdmin = {};
    res.clearCookie('isAdmin');
    Server.io.sockets.emit('hijackSuccess', {noHijack: true});
    res.redirect('/');
  });      

  socket.on('initLoad', function(data) {
    var getData = getSlideData();
    data['slideData'] = getData;
    data['pollData'] = Server.data.pollData;
    data['isAdmin'] = Server.data.isAdmin;
    socket.emit('initSuccess', data);
  });

  socket.on('vote', function(data) {
    for(var key in data) {
      var value = Server.data.pollData[key] || 0;
      Server.data.pollData[key] = value + data[key];
    }
    Server.io.sockets.emit('voteSuccess', Server.data.pollData);
  });

  socket.on('direction', function(data) {
    Server.io.sockets.emit('directionSuccess', data);
  });

  socket.on('disconnect', function() {
    console.log('socket.on user disconnected');
  });
});

Server.io.sockets.on('disconnect', function() {
  console.log('io.sockets user disconnected');
});

Server.http.listen(8080);
