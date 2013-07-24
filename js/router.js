var MainRouter = Backbone.Router.extend({
  routes: {
    '': 'home',
    'slides/:id': 'showSlides'
  },

  home: function() {
    // App.Vent.trigger('init');
  },

  showSlides: function(slideIndex) {
    // App.Vent.trigger('');
  }

});