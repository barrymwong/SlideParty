var SlideView = Backbone.View.extend({
  className: 'slide',

  render: function() {
    if(this.model.get('title')) {
      this.renderHeadline();
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
    if(this.model.get('html')) {
      this.renderHTML();
    } 
    if(this.model.get('textBottom')) {
      this.renderTextBottom();
    } 
    return this;
  },

  renderShareLink: function() {
    if(!!this.model.get('shareLink')) {
      var loc = location.href;
      var address = loc.split('/');
      this.$el.attr('data-slide', this.cid).append(
        '<p>Share Slide: <a href="' + loc + '">'+ address[2] +'</a></p>'
      );
    }
    return this;
  },

  renderHTML: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div>' + this.model.get('html') + '</div>'
    );
    return this;
  },

  renderTextTop: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<p>' + this.model.get('textTop') + '</p>'
    );
    return this;
  },

  renderTextBottom: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<p>' + this.model.get('textBottom') + '</p>'
    );
    return this;
  },

  renderPoll: function() {
    var data = {poll: this.model.get('poll')};
    var pollView = new PollView({model: new PollModel(data)});
    this.$el.append(pollView.render().el);
    return this;
  },

  renderHeadline: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<h1>' + this.model.get('title') + '</h1>'
    );
    return this;
  },

  renderImage: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<img src="' + this.model.get('image') + '">'
    );
    return this;
  },

  renderD3: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<div class="' + this.model.get('d3') + '"></div>' +
      '<script src="js/d3/' + this.model.get('d3') + '.js"></script>'
    );
    return this;
  },

  renderYoutube: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<iframe width="480" height="360" src="' + this.model.get('youtube') + '" frameborder="0" allowfullscreen></iframe>'
    );
    return this;
  },

  renderTweet: function() {
    this.$el.attr('data-slide', this.cid).append(
      '<blockquote class="twitter-tweet" align="center">' + this.model.get('tweet') + '</blockquote>'
    );
  }

});