var SlidesView = Backbone.View.extend({
  className: 'slides',

  initialize: function() {
    this.currentSlideIndex = 1;
    App.Vent.on('init', this.hideAllButFirst, this);
    App.Vent.on('changeSlide', this.changeSlide, this);
    this.transitionSpeed = 400;
  },

  hideAllButFirst: function() {
    this.$el.children(':nth-child(n+2)').hide();
  },

  changeSlide: function(options) {
    var newSlide,
        slides = this.$el.children();

    if(options.slideIndex) {
      this.currentSlideIndex = +options.slideIndex;

      newSlide = slides.eq(this.currentSlideIndex - 1);

      if(this.currentSlideIndex < 2) {
        $('#prev').hide();
      } else if(this.currentSlideIndex === App.slides.length) {
        $('#next').hide();
      } else {
        $('#next, #prev').show();
      }

      slides
        .filter(':visible')
        .css('position', 'absolute')
        .animate({
          left: options.direction === 'next' ? '-100%' : '100%',
          opacity: 'hide'
        }, this.transitionSpeed, function() {
          $(this).css({left: 0});
        });

      newSlide
        .css({
          position: 'absolute',
          left: options.direction === 'next' ? '100%' : '-100%'
        }).animate({
          left: 0,
          opacity: 'show'
        }, this.transitionSpeed);

      App.mainRouter.navigate('/slides/' + this.currentSlideIndex);

    } else {
      this.setCurrentSlideIndex(options.direction);
    }
  },

  setCurrentSlideIndex: function(dir) {
    var newSlide,
        slides = this.$el.children(),
        lastSlide = this.currentSlideIndex,
        slideIndex = dir === 'next' ? ++this.currentSlideIndex : --this.currentSlideIndex;

    slideIndex = slideIndex < 1 ? 1 : slideIndex > App.slides.length ? App.slides.length : slideIndex;
    this.currentSlideIndex = slideIndex;

    // client sends to server
    if(slideIndex > 0 && slideIndex <= App.slides.length && slideIndex !== lastSlide) {
      socket.emit('direction', {direction: dir, slideIndex: slideIndex});
    }
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