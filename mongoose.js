var mongoose = require('mongoose'),
    slideData = 'test';

mongoose.connect('mongodb://' + "localhost" + '/test');
var myDB = mongoose.connection;

myDB.on('error', console.error.bind(console, 'connection error:'));

myDB.once('open', function callback () {
  console.log("MY DB Connected with Mongoose");
});

slideSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    timestamp: Date
  },
  {
    collection: 'test_insert'
  }
);

exports.Slide = mongoose.model('test_insert', slideSchema);

var slide = new exports.Slide({title: 'cheeseburger', timestamp: new Date()});
var slide2 = new exports.Slide({title: 'prime rib', image: 'http://barrymwong.com/images/pacific_ave.jpg', timestamp: new Date()});
var slide3 = new exports.Slide({title: 'buta kimchee', timestamp: new Date()  });

slide.save(function(err, slide) {
  slide.title;
});
slide2.save(function(err, slide) {
  slide.title;
});
slide3.save(function(err, slide) {
  slide.title;
});



