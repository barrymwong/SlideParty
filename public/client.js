var socket = io.connect(location.href);

// triggered from server
socket.on('directionSuccess', function(data) {
  App.Vent.trigger('changeSlide', {
    direction: data.direction,
    slideIndex: data.slideIndex,
    slideData: data.slideData
  });
});

socket.on('initSuccess', function(data) {
  //console.log('initSuccess-->', data);
  App.Vent.trigger('appInit', data);
});

socket.on('voteSuccess', function(data) {
  //console.log('voteSuccess-->', data);
  App.Vent.trigger('updateVote', data);
});

socket.on('slideUpdateSuccess', function(data) {
  App.Vent.trigger('renderSingle', data);
});

socket.on('hijackSuccess', function(data) {
  App.Vent.trigger('hijack', data);
});

socket.on('connect', function(data) {
});