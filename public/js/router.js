var MainRouter = Backbone.Router.extend({
  routes: {
    '': 'home',
    'slides/:id': 'showSlides',
    'login': 'login'
  },

  home: function() {
    App.Vent.trigger('init');
  },

  login: function() {
    console.log('----> Login');
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