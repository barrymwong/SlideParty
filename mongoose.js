var mongoose = require("mongoose");

mongoose.connect('mongodb://' + "localhost" + '/test');
var myDB = mongoose.connection;

myDB.on('error', console.error.bind(console, 'connection error:'));

myDB.once('open', function callback () {
  console.log("MY DB Connected with Mongoose");
});