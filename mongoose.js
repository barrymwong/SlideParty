var mongoose = require("mongoose");

mongoose.connect('mongodb://' + "localhost" + '/test');
var myDB = mongoose.connection;

myDB.on('error', console.error.bind(console, 'connection error:'));

myDB.once('open', function callback () {
  console.log("MY DB Connected with Mongoose");
});

var slideSchema = new mongoose.Schema(
  {
    image: String,
    title: String
  },
  {
    collection: 'test_insert2'
  }
);

var Slide = mongoose.model('test_insert2', slideSchema);


var slide = new Slide({title: 'cheeseburger'});
var slide2 = new Slide({title: 'prime rib'});
var slide3 = new Slide({title: 'buta kimchee'});

slide.save(function(err, slide) {
  slide.title;
});
