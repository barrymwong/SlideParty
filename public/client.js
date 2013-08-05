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
  console.log('initSuccess-->', data);
  App.Vent.trigger('appInit', data);
});

socket.on('voteSuccess', function(data) {
  console.log('voteSuccess-->', data);
  App.Vent.trigger('updateVote', data);
});

socket.on('enableAdmin', function(data) {
  console.log('voteSuccess-->', data);
  App.Vent.trigger('updateVote', data);
});

socket.on('connect', function(data) {
  console.log('---->connection<----', data);
});