var mongoose = require('mongoose'),
    _und = require('underscore'),
    json = require('./slides.json'),
    db = 'slidepartyjs',
    domain = 'localhost',
    collection = 'slides';

mongoose.connect('mongodb://' + domain + '/' + db);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function() {
  console.log("MY DB Connected with Mongoose");
  slideSchema = new mongoose.Schema({
    image: String,
    title: String,
    timestamp: Date
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




