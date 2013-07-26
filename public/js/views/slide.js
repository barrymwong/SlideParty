var SlideView = Backbone.View.extend({
  className: 'slide',

  render: function() {
    if(this.model.get('image')) {
      this.renderImage();
    } else if(this.model.get('title')) {
      this.renderHeadline();
    }
    return this;
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
  }
});