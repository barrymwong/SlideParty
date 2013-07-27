var socket = io.connect(location.href);

socket.on('directionSuccess', function(data) {
  socket.emit('something', {my: 'data'});
  App.serverListenData = data;
  App.Vent.trigger('changeSlide', {
    direction: data.direction,
    slideIndex: data.slideIndex
  });
});