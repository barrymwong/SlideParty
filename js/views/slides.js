var SlidesView = Backbone.View.extend({
  className: 'slides',

  render: function() {
    this.$el.empty();

    this.collection.each(function(slide){
      var slideView = new SlideView({model: slide});
      this.$el.append(slideView.render().el);
    }, this);

    return this;
  }
});