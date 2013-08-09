SPTY.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'home',
    'slides/:id': 'showSlides'
  },

  home: function() {
    SPTY.Events.trigger('init');
  },

  showSlides: function(slideIndex) {
    if(slideIndex <= SPTY.slides.length) {
      SPTY.Events.trigger('changeSlide', {
        slideIndex: slideIndex,
        direction: 'next'
      });
    }
  }

});