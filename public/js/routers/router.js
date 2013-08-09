Spty.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'home',
    'slides/:id': 'showSlides'
  },

  home: function() {
    Spty.Vent.trigger('init');
  },

  showSlides: function(slideIndex) {
    if(slideIndex <= Spty.slides.length) {
      Spty.Vent.trigger('changeSlide', {
        slideIndex: slideIndex,
        direction: 'next'
      });
    }
  }

});