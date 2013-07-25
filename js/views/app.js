var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    var data = [
      {title: '1. My Presentation'},
      {title: '2. About Giraffes'},
      {title: '3. What Do Giraffes Eat?'},
      {title: '4. Where Do Giraffes Live?'}
    ];

    this.slidesView = new SlidesView({
      collection: new SlidesCollection(data)
    });

    this.render();

    App.mainRouter = new MainRouter();
    Backbone.history.start();
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