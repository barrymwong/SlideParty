var socket = io.connect(location.href);

// triggered from server
socket.on('directionSuccess', function(data) {
  Spty.Vent.trigger('changeSlide', {
    direction: data.direction,
    slideIndex: data.slideIndex,
    slideData: data.slideData
  });
});

socket.on('initSuccess', function(data) {
  //console.log('initSuccess-->', data);
  Spty.Vent.trigger('appInit', data);
});

socket.on('voteSuccess', function(data) {
  //console.log('voteSuccess-->', data);
  Spty.Vent.trigger('updateVote', data);
});

socket.on('slideUpdateSuccess', function(data) {
  Spty.Vent.trigger('renderSingle', data);
});

socket.on('hijackSuccess', function(data) {
  Spty.Vent.trigger('hijack', data); // {noHijack: false}
});

socket.on('connect', function(data) {
});