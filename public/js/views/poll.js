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
    this.$el.append(
      '<div class="poll">' + this.model.get('poll') + '</div>'
    );
    return this;
  },

  renderChart: function() {
    this.$el.append(
      '<div class="poll">' + this.model.get('poll') + '</div>'
    );
    return this;
  },

  renderText: function() {
    this.$el.append(
      '<div class="poll">' + this.model.get('poll') + '</div>'
    );
    return this;
  }

});