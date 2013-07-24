var SlidesView = Backbone.View.extend({
  className: 'slides',

  initialize: function() {
    this.currentSlideIndex = 1;
    App.Vent.on('init', this.hideAllButFirst, this);
    App.Vent.on('changeSlide', this.changeSlide, this);
  },

  hideAllButFirst: function() {
    this.$el.children(':nth-child(n+2)').hide();
  },

  changeSlide: function(options) {
    var newSlide,
        slide = this.$el.children();

        console.log(this.currentSlideIndex, this.collection.length);

    if(this.currentSlideIndex > 0) {
      if(options.slideIndex) {
        this.currentSlideIndex = +options.slideIndex;
      } else {
        this.nextSlide(options.direction);
      }

      slide.hide();
      slide.eq(this.currentSlideIndex - 1).show();
    }
  },

  nextSlide: function(dir) {
    var slide = this.$el.children(), 
        go = 0;

    go = dir === 'next' ? this.currentSlideIndex++ : this.currentSlideIndex--;

    // boundries
    //go = go < 1 ? 1 : go > this.collection.length ? this.collection.length : go;

    console.log('go -->', go, this.currentSlideIndex);

    App.mainRouter.navigate('slides/' + go);
    slide.hide();
    slide.eq(go).show();
  },

  render: function() {
    this.$el.empty();

    this.collection.each(function(slide){
      var slideView = new SlideView({model: slide});
      this.$el.append(slideView.render().el);
    }, this);

    return this;
  }
});