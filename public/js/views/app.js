Spty.Views.App = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    Spty.Vent.on('appInit', this.appInit, this);
    Spty.Vent.on('hijack', this.doNotHijack, this);
    Spty.socket.emit('initLoad', {});
  },

  events: {
    'keyup': 'keyUp',
    'click .button-slide': 'nextPrevButtons'
  },

  appInit: function(data) {
    Spty.slides = data.slideData;
    this.slidesView = new Spty.Views.Slides({
      collection: new Spty.Collections.Slides(Spty.slides)
    });
    this.render();
    Spty.mainRouter = new Spty.Routers.Main();
    Backbone.history.start();

    if(!location.hash) {
      Spty.Vent.trigger('changeSlide', {
        slideIndex: 1,
        direction: 'next'
      });    
    }

    if(this.adminCheck() || Object.keys(data.isAdmin).length === 0) {
      Spty.Vent.trigger('hijack', {noHijack: true});
    } else {
      Spty.Vent.trigger('hijack', {noHijack: false});
    }

    Spty.Vent.trigger('updateVote', data.pollData);
    twttr.widgets.load(); 
  },

  adminCheck: function() {
    return /isAdmin/.test(document.cookie);
  },

  doNotHijack: function(data) {
    Spty.noHijack = data.noHijack;
    if(this.adminCheck()) {
      $('.notice').html('Presenter | <a href="/edit">New Slide</a> | <a href="/logout">Logout</a>');
      $('body').removeClass('is-hijack');
    } else if (Spty.noHijack === true) {
      $('.notice').html('<a href="/login">Presenter Login</a>');
      $('body').removeClass('is-hijack');
    } else {
      $('.notice').html('Live Presentation Mode: On');
      $('body').addClass('is-hijack');
    }
  },

  keyUp: function(event) {
    // left 37, right 39
    if(event.keyCode === 37 || event.keyCode === 39){
      if(!this.adminCheck() && Spty.noHijack === false) {
        return false;
      }
      Spty.Vent.trigger('changeSlide', {
        direction: event.keyCode === 39 ? 'next': 'prev'
      });
    }
  },

  nextPrevButtons: function(event) {
    event.preventDefault();
    if(!this.adminCheck() && Spty.noHijack === false) {
      return false;
    }
    Spty.Vent.trigger('changeSlide', {
      direction: $(event.target).data('slide')
    });
  },

  renderNextPrevButtons: function() {
    this.$el.append(
      '<a id="prev" data-slide="prev" class="button-slide" href="#"></a>' +
      '<a id="next" data-slide="next" class="button-slide" href="#"></a>'
    );
    return this;
  },

  getData: function() {
    Spty.socket.emit('direction', {direction: 'next', slideIndex: 1});
  },

  render: function() {
    this.$el.append(this.slidesView.render().el);
    this.renderNextPrevButtons();
    this.$el.append('<div class="notice"></div>');
    return this;
  }
});