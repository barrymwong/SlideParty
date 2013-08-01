var mongoose = require('mongoose'),
    _und = require('underscore'),
    json = require('./slides.json');

mongoose.connect('mongodb://' + 'localhost' + '/test');
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

exports.Slide.find({}).remove();

_und.each(json.slides, function(value, index) {
  var slide = new exports.Slide(json.slides[index]);

  slide.save(function(err, slide) {
    for(var key in json.slides[index]) {
      slide[key] = value;
    }
  });
});
