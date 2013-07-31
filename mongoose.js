var mongoose = require('mongoose');

mongoose.connect('mongodb://' + "localhost" + '/test');
var myDB = mongoose.connection;

myDB.on('error', console.error.bind(console, 'connection error:'));

myDB.once('open', function callback () {
  console.log("MY DB Connected with Mongoose");
});

exports.slideSchema = new mongoose.Schema(
  {
    image: String,
    title: String
  },
  {
    collection: 'test_insert2'
  }
);

exports.Slide = mongoose.model('test_insert2', exports.slideSchema);

var slide = new exports.Slide({title: 'cheeseburger'});
var slide2 = new exports.Slide({title: 'prime rib'});
var slide3 = new exports.Slide({title: 'buta kimchee'});

slide.save(function(err, slide) {
  slide.title;
});

slide2.save(function(err, slide) {
  slide2.title;
});

slide3.save(function(err, slide) {
  slide3.title;
});

exports.Slide.find(function(err, slides) {
  if(err) {
    return err;
  }
  exports.slides = slides;
});
