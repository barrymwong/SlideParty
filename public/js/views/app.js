var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    this.noHijack = true;
    App.Vent.on('appInit', this.appInit, this);
    App.Vent.on('hijack', this.doNotHijack, this);
    socket.emit('initLoad', {});
  },

  events: {
    'keyup': 'keyUp',
    'click .button-slide': 'nextPrevButtons'
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

    if(data.isAdmin.hasOwnProperty('admin')) {
      App.Vent.trigger('hijack', {noHijack: false});
    }

    twttr.widgets.load();
    App.Vent.trigger('updateVote', data.pollData);
  },

  doNotHijack: function(data) {
    this.noHijack = data.noHijack;
    if(this.noHijack) {
      $('body').removeClass('is-hijack');
    } else {
      $('body').addClass('is-hijack');
    }
  },

  keyUp: function(event) {
    if(this.noHijack === false) {
      return false;
    }
    // left 37, right 39
    if(event.keyCode === 37 || event.keyCode === 39){
      App.Vent.trigger('changeSlide', {
        direction: event.keyCode === 39 ? 'next': 'prev'
      });
    }
  },

  nextPrevButtons: function(event) {
    event.preventDefault();
    if(this.noHijack === false) {
      return false;
    }
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