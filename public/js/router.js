var MainRouter = Backbone.Router.extend({
  routes: {
    '': 'home',
    'slides/:id': 'showSlides'
  },

  home: function() {
    App.Vent.trigger('init');
  },

  showSlides: function(slideIndex) {
    if(slideIndex <= App.slides.length) {
      App.Vent.trigger('changeSlide', {
        slideIndex: slideIndex,
        direction: 'next'
      });
    }
  }

});