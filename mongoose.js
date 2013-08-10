var mongoose = require('mongoose'),
    _und = require('underscore'),
    json = require('./slides.json'),
    collection = 'slides',
    dbEnv = process.env.MONGODB ? process.env.MONGODB : 'mongodb://localhost/slideparty';

mongoose.connect(dbEnv);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function() {
  slideSchema = new mongoose.Schema({
    sortID: Number,
    image: String,
    title: String,
    timestamp: Date,
    youtube: String,
    d3: String,
    poll: String,
    tweet: String,
    textTop: String,
    textBottom: String,
    shareLink: Boolean,
    html: String,
    login: String,
    home: Boolean
  },
  {
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