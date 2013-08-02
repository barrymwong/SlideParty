var SlideView = Backbone.View.extend({
  className: 'slide',

  render: function() {
    if(this.model.get('title')) {
      this.renderHeadline();
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
    this.renderPoll();

    return this;
  },

  renderPoll: function() {
    var data = {type: 'graphic'};
    var pollView = new PollView({model: new PollModel(data)});
    this.$el.append(
      pollView.render().el
    );
  },

  renderHeadline: function() {
    this.$el.append(
      '<h1>' + this.model.get('title') + '</h1>'
    );
    return this;
  },

  renderImage: function() {
    this.$el.append(
      '<img src="' + this.model.get('image') + '">'
    );
    return this;
  },

  renderD3: function() {
    this.$el.append(
      '<div id="' + this.model.get('d3') + '"></div>' +
      '<script src="js/d3/' + this.model.get('d3') + '.js"></script>'
    );
    return this;
  },

  renderYoutube: function() {
    this.$el.append(
      '<iframe width="480" height="360" src="' + this.model.get('youtube') + '" frameborder="0" allowfullscreen></iframe>'
    );
    return this;
  }
});