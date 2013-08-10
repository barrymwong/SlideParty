SPTY.Views.Slide = Backbone.View.extend({
  className: 'slide',

  templateHome: _.template($('#template-home').html()),

  render: function() {
    if(this.model.get('home')) {
      this.renderHome();
    } 
    if(this.model.get('title')) {
      this.renderHeadline();
    } 
    if(this.model.get('html')) {
      this.renderHTML();
    } 
    if(this.model.get('shareLink')) {
      this.renderShareLink();
    } 
    if(this.model.get('textTop')) {
      this.renderTextTop();
    } 
    if(this.model.get('image')) {
      this.renderImage();
    } 
    if(this.model.get('youtube')) {
      this.renderYoutube();
    }
    if(this.model.get('d3')) {
      this.renderD3();
    }
    if(this.model.get('tweet')) {
      this.renderTweet();
    }
    if(this.model.get('poll')) {
      this.renderPoll();
    }
    if(this.model.get('textBottom')) {
      this.renderTextBottom();
    }
    return this;
  },

  renderHome: function() {
    this.$el.attr('data-slide', this.cid).append(
      this.templateHome(this.model.toJSON())
    );
    return this;
  },

  renderLogin: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div><a href="#login">Login<a></div>'
    );
    return this;
  },

  renderShareLink: function() {
    if(!!this.model.get('shareLink')) {
      var loc = location.href;
      var address = loc.split('/');
      this.$el.attr('data-slide', this.cid).append(
        '<div class="content"><p>Share Slide: <a href="' + loc + '">'+ address[2] +'</a> | ' +
        '<a href="/login">Login</a></p></div>'
      );
    }
    return this;
  },

  renderHTML: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div class="content">' + this.model.get('html') + '</div>'
    );
    return this;
  },

  renderTextTop: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div class="content"><p>' + this.model.get('textTop') + '</p></div>'
    );
    return this;
  },

  renderTextBottom: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div class="content"><p>' + this.model.get('textBottom') + '</p></div>'
    );
    return this;
  },

  renderPoll: function() {
    var data = {poll: this.model.get('poll')};
    var pollView = new SPTY.Views.Poll({model: new SPTY.Models.Poll(data)});
    this.$el.append(pollView.render().el);
    return this;
  },

  renderHeadline: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<header><h1 class="title">' + this.model.get('title') + '</h1></header>'
    );
    return this;
  },

  renderImage: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div class="content"><img src="' + this.model.get('image') + '"></div>'
    );
    return this;
  },

  renderD3: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div class="content"><div class="' + this.model.get('d3') + '"></div></div>' +
      '<script src="js/d3/' + this.model.get('d3') + '.js"></script>'
    );
    return this;
  },

  renderYoutube: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div class="content">' + this.model.get('youtube') + '</div>'
    );
    return this;
  },

  renderTweet: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div class="content">' + this.model.get('tweet') + '</div>'
    );
    return this;
  }

});