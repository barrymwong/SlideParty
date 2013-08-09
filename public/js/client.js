SPTY.socket = io.connect(location.href);

SPTY.socket.on('directionSuccess', function(data) {
  SPTY.Events.trigger('changeSlide', {
    direction: data.direction,
    slideIndex: data.slideIndex,
    slideData: data.slideData
  });
});

SPTY.socket.on('initSuccess', function(data) {
  SPTY.Events.trigger('appInit', data);
});

SPTY.socket.on('voteSuccess', function(data) {
  SPTY.Events.trigger('updateVote', data);
});

SPTY.socket.on('slideUpdateSuccess', function(data) {
  SPTY.Events.trigger('renderSingle', data);
});

SPTY.socket.on('hijackSuccess', function(data) {
  SPTY.Events.trigger('hijack', data);
});