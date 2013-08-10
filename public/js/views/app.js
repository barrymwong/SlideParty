SPTY.Views.App = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    SPTY.Events.on('appInit', this.appInit, this);
    SPTY.Events.on('hijack', this.doNotHijack, this);
    SPTY.socket.emit('initLoad', {});
  },

  events: {
    'keyup': 'keyUp',
    'click .button-slide': 'nextPrevButtons'
  },

  appInit: function(data) {
    SPTY.slides = data.slideData;
    this.slidesView = new SPTY.Views.Slides({
      collection: new SPTY.Collections.Slides(SPTY.slides)
    });
    this.render();
    SPTY.mainRouter = new SPTY.Routers.Main();
    Backbone.history.start();

    if(!location.hash) {
      SPTY.Events.trigger('changeSlide', {
        slideIndex: 1,
        direction: 'next'
      });    
    }

    if(this.adminCheck() || Object.keys(data.isAdmin).length === 0) {
      SPTY.Events.trigger('hijack', {noHijack: true});
    } else {
      SPTY.Events.trigger('hijack', {noHijack: false});
    }

    SPTY.Events.trigger('updateVote', data.pollData);
    twttr.widgets.load(); 
  },

  adminCheck: function() {
    return /isAdmin/.test(document.cookie);
  },

  doNotHijack: function(data) {
    SPTY.noHijack = data.noHijack;
    if(this.adminCheck()) {
      $('.notice').html('Presenter | <a href="/create">New Slide</a> | <a href="/logout">Logout</a>');
      $('body').removeClass('is-hijack');
    } else if (SPTY.noHijack === true) {
      $('.notice').html('<a href="/login" class="button">Presenter Login</a>');
      $('body').removeClass('is-hijack');
    } else {
      $('.notice').html('Live Presentation Mode: On');
      $('body').addClass('is-hijack');
    }
  },

  keyUp: function(event) {
    if(event.keyCode === 37 || event.keyCode === 39){
      if(!this.adminCheck() && SPTY.noHijack === false) {
        return false;
      }
      SPTY.Events.trigger('changeSlide', {
        direction: event.keyCode === 39 ? 'next': 'prev'
      });
    }
  },

  nextPrevButtons: function(event) {
    event.preventDefault();
    if(!this.adminCheck() && SPTY.noHijack === false) {
      return false;
    }
    SPTY.Events.trigger('changeSlide', {
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
    SPTY.socket.emit('direction', {direction: 'next', slideIndex: 1});
  },

  render: function() {
    this.$el.append(this.slidesView.render().el);
    this.renderNextPrevButtons();
    this.$el.append('<div class="notice"></div>');
    return this;
  }
});