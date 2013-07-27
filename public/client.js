var socket = io.connect('http://localhost');

socket.on('directionSuccess', function(data) {
  console.log('directionSuccess -->', data);
  socket.emit('something', {my: 'data'});
  App.serverListenData = data;
});