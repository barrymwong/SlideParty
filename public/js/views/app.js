var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    App.Vent.on('appInit', this.appInit, this);
    socket.emit('initLoad', {});
  },

  appInit: function(data) {
    App.slides = data.slideData;

    this.slidesView = new SlidesView({
      collection: new SlidesCollection(App.slides)
    });

    this.render();

    App.mainRouter = new MainRouter();
    Backbone.history.start();

    if(!location.hash) {
      App.Vent.trigger('changeSlide', {
        slideIndex: 1,
        direction: 'next'
      });    
    }

    App.Vent.trigger('updateVote', data.pollData);

    twttr.widgets.load();
  },

  events: {
    'keyup': 'keyUp',
    'click .button-slide' : 'nextPrevButtons'
  },

  keyUp: function(event) {
    // left 37, right 39
    if(event.keyCode === 37 || event.keyCode === 39){
      App.Vent.trigger('changeSlide', {
        direction: event.keyCode === 39 ? 'next': 'prev'
      });
    }
  },

  nextPrevButtons: function(event) {
    event.preventDefault();

    App.Vent.trigger('changeSlide', {
      direction: $(event.target).data('slide')
    });
  },

  renderNextPrevButtons: function() {
    this.$el.append(
      '<a id="prev" data-slide="prev" class="button-slide" href="#">Prev</a>' +
      '<a id="next" data-slide="next" class="button-slide" href="#">Next</a>'
    );
    return this;
  },

  getData: function() {
    socket.emit('direction', {direction: 'next', slideIndex: 1});
  },

  render: function() {
    this.$el.append(this.slidesView.render().el);
    this.renderNextPrevButtons();
    return this;
  }
});