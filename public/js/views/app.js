var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    this.slidesView = new SlidesView({
      collection: new SlidesCollection(App.slides)
    });

    this.render();

    App.mainRouter = new MainRouter();
    Backbone.history.start();

    this.intervalTime = 1000;
    this.serverListener();
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

  serverListener: function() {
    var t = setInterval(function() {
      if(App.serverListenData !== null) {
        App.Vent.trigger('changeSlide', {
          direction: App.serverListenData.direction,
          slideIndex: App.serverListenData.slideIndex
        });
      }
      App.serverListenData = null;
    }, this.intervalTime);
  },

  nextPrevButtons: function(event) {
    event.preventDefault();

    App.Vent.trigger('changeSlide', {
      direction: $(event.target).data('slide')
    });
  },

  renderNextPrevButtons: function() {
    this.$el.append(
      '<a id="prev" data-slide="prev" class="button-slide" href="#">Prev</a>'+
      '<a id="next" data-slide="next" class="button-slide" href="#">Next</a>'
    );
    return this;
  },

  render: function() {
    this.$el.append(this.slidesView.render().el);
    this.renderNextPrevButtons();
    return this;
  }
});