var mongoose = require('mongoose'),
    _und = require('underscore'),
    json = require('./slides.json'),
    db = 'slideparty',
    domain = 'localhost',
    collection = 'slides';

console.log('NODE_ENV-->', process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://nodejitsu:ab9ddee52584485c5730a5744caf7d90@dharma.mongohq.com:10065/nodejitsudb85789971');
} else {
  mongoose.connect('mongodb://' + domain + '/' + db);
}

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function() {
  console.log("MY DB Connected with Mongoose");
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
    login: String
  }, {
    collection: collection
  });

  exports.Slide = mongoose.model(collection, slideSchema);

  //exports.Slide.find({}).remove();
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




