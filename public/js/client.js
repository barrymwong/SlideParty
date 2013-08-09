Spty.socket = io.connect(location.href);

// triggered from server
Spty.socket.on('directionSuccess', function(data) {
  Spty.Vent.trigger('changeSlide', {
    direction: data.direction,
    slideIndex: data.slideIndex,
    slideData: data.slideData
  });
});

Spty.socket.on('initSuccess', function(data) {
  //console.log('initSuccess-->', data);
  Spty.Vent.trigger('appInit', data);
});

Spty.socket.on('voteSuccess', function(data) {
  //console.log('voteSuccess-->', data);
  Spty.Vent.trigger('updateVote', data);
});

Spty.socket.on('slideUpdateSuccess', function(data) {
  Spty.Vent.trigger('renderSingle', data);
});

Spty.socket.on('hijackSuccess', function(data) {
  Spty.Vent.trigger('hijack', data); // {noHijack: false}
});