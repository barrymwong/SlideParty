var SlideView = Backbone.View.extend({
  className: 'slide',

  render: function() {
    this.$el.append(
      '<h1>' + this.model.get('title') + '</h1>'
    );
    return this;
  }
});