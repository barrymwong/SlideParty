var socket = io.connect('http://localhost');
socket.on('news', function(data) {
  console.log(data);
  socket.emit('my other event', {my: 'data'});
});

socket.on('messageSuccess', function(data) {
  console.log('success-->', data);
});

$('form').on('submit', function(event) {
  event.preventDefault();
  var name = $('#name').val();
  var message = $('#message').val();
  socket.emit('message', {
    message: message,
    name: name
  });
});
