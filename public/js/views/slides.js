SPTY.Views.Slides = Backbone.View.extend({
  className: 'slides',

  initialize: function() {
    this.currentSlideIndex = 1;
    this.doNotHijack({noHijack: SPTY.noHijack});
    SPTY.Events.on('init', this.hideAllButFirst, this);
    SPTY.Events.on('changeSlide', this.changeSlide, this);
    SPTY.Events.on('renderSingle', this.renderSingle, this);
    SPTY.Events.on('hijack', this.doNotHijack, this);
    this.transitionSpeed = 400;
  },

  doNotHijack: function(data) {
    SPTY.noHijack = data.noHijack;
  },

  adminCheck: function() {
    return /isAdmin/.test(document.cookie);
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
      } else if(this.currentSlideIndex === SPTY.slides.length) {
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

      SPTY.mainRouter.navigate('/slides/' + this.currentSlideIndex);

    } else {
      this.setCurrentSlideIndex(options.direction);
    }
  },

  setCurrentSlideIndex: function(dir) {
    var newSlide,
        slides = this.$el.children(),
        lastSlide = this.currentSlideIndex,
        slideIndex = dir === 'next' ? ++this.currentSlideIndex : --this.currentSlideIndex;

    slideIndex = slideIndex < 1 ? 1 : slideIndex > SPTY.slides.length ? SPTY.slides.length : slideIndex;
    this.currentSlideIndex = slideIndex;

    // client sends to server
    if(slideIndex > 0 && slideIndex <= SPTY.slides.length && slideIndex !== lastSlide) {
      if(!this.adminCheck() && SPTY.noHijack === true) {
        SPTY.Events.trigger('changeSlide', {
          slideIndex: slideIndex,
          direction: dir
        });
      } else {
        SPTY.socket.emit('direction', {direction: dir, slideIndex: slideIndex});
      }
    }
  },

  renderSingle: function(data) {
    SPTY.slides.push(data);
    var slideView = new SPTY.Views.Slide({
      model: new SlideModel(data)
    });
    this.$el.append(slideView.render().el);
  },

  render: function() {
    this.$el.empty();

    this.collection.each(function(slide){
      var slideView = new SPTY.Views.Slide({model: slide});
      this.$el.append(slideView.render().el);
    }, this);

    return this;      
  }
});