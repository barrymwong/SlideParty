var mongoose = require('mongoose'),
    _und = require('underscore'),
    json = require('./slides.json'),
    db = 'slidepartyjs',
    domain = 'localhost',
    collection = 'slides';

if(process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://nodejitsu:5f75182b11a67754c879ac539efce7a4@dharma.mongohq.com:10043/nodejitsudb6486629187');
} else {
  mongoose.connect('mongodb://' + domain + '/' + db);
}

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function() {
  console.log("MY DB Connected with Mongoose");
  slideSchema = new mongoose.Schema({
    image: String,
    title: String,
    timestamp: Date,
    youtube: String
  }, {
    collection: collection
  });

  exports.Slide = mongoose.model(collection, slideSchema);

  exports.Slide.find({}).remove();
  exports.Slide.count({}, function(err, count) {
    if(count === 0) {
      _und.each(json.slides, function(value, index) {
        var slide = new exports.Slide(json.slides[index]);
        slide.save(function(err, slide) {
          for(var key in json.slides[index]) {
            slide[key] = value;
          }
        });
      });
    }
  });

});




