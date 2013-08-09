SPTY.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'home',
    'slides/:id': 'showSlides'
  },

  home: function() {
    SPTY.Vent.trigger('init');
  },

  showSlides: function(slideIndex) {
    if(slideIndex <= SPTY.slides.length) {
      SPTY.Vent.trigger('changeSlide', {
        slideIndex: slideIndex,
        direction: 'next'
      });
    }
  }

});