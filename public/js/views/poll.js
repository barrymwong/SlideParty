var PollView = Backbone.View.extend({
  className: 'poll',

  render: function() {
    if(this.model.get('poll') === 'vote') {
      this.renderVote();
    }
    if(this.model.get('poll') === 'chart') {
      this.renderChart();
    }
    if(this.model.get('poll') === 'text') {
      this.renderText();
    }
    return this;
  },

  renderVote: function() {
    var buttonView = new ButtonView({model: new ButtonModel()});

    this.$el.append(buttonView.render().el);
    return this;
  },

  renderChart: function() {
    var buttonView = new ButtonView({model: new ButtonModel()});

    this.$el.append(buttonView.render().el);
    return this;
  },

  renderText: function() {
    var buttonView = new ButtonView({model: new ButtonModel()});

    this.$el.append(buttonView.render().el);
    return this;
  }

});