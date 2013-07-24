var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    var data = [
      {title: 'About Giraffes'},
      {title: 'What Giraffes Eat'}
    ];

    this.slidesView = new SlidesView({
      collection: new SlidesCollection(data)
    });

    this.render();

    App.mainRouter = new MainRouter();
    Backbone.history.start();
    App.mainRouter.navigate('slides/' + 1);
  },

  events: {
    'keyup': 'keyUp'
  },

  keyUp: function(event) {
    // left 37, right 39
    if(event.keyCode === 37 || event.keyCode === 39){
      App.Vent.trigger('changeSlide', {
        direction: event.keyCode === 39 ? 'next': 'prev'
      });
    }
  },

  render: function() {
    this.$el.append(this.slidesView.render().el);
    return this;
  }
});