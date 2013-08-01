var socket = io.connect(location.href);

// triggered from server
socket.on('directionSuccess', function(data) {
  console.log('directionSuccess', data);

  App.Vent.trigger('changeSlide', {
    direction: data.direction,
    slideIndex: data.slideIndex,
    slideData: data.slideData
  });
});

socket.on('initSuccess', function(data) {
  App.Vent.trigger('appInit', data);
});