var socket = io.connect(location.href);

// triggered from server
socket.on('directionSuccess', function(data) {
  console.log('directionSuccess', data);
  socket.emit('something', {my: 'data'});
  App.serverListenData = data;
  App.Vent.trigger('changeSlide', {
    direction: data.direction,
    slideIndex: data.slideIndex
  });
});