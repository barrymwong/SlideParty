var AppView = Backbone.View.extend({
  el: 'body',

  initialize: function() {
    var data = [
      {title: 'About Giraffes'},
      {title: 'What Giraffes Eat'}
    ];

    this.slidesView = new SlidesView({
      collection: new SlidesCollection(data)
    });

    this.render();
  },

  render: function() {
    this.$el.append(this.slidesView.render().el);

    return this;
  }
});