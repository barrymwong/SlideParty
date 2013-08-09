SPTY.socket = io.connect(location.href);

// triggered from server
SPTY.socket.on('directionSuccess', function(data) {
  SPTY.Vent.trigger('changeSlide', {
    direction: data.direction,
    slideIndex: data.slideIndex,
    slideData: data.slideData
  });
});

SPTY.socket.on('initSuccess', function(data) {
  //console.log('initSuccess-->', data);
  SPTY.Vent.trigger('appInit', data);
});

SPTY.socket.on('voteSuccess', function(data) {
  //console.log('voteSuccess-->', data);
  SPTY.Vent.trigger('updateVote', data);
});

SPTY.socket.on('slideUpdateSuccess', function(data) {
  SPTY.Vent.trigger('renderSingle', data);
});

SPTY.socket.on('hijackSuccess', function(data) {
  SPTY.Vent.trigger('hijack', data); // {noHijack: false}
});