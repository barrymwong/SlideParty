var PollView = Backbone.View.extend({
  className: 'poll',

  initialize: function() {
    this.votes = 0;
  },

  events: {
    'click button': 'doVote'
  },

  doVote: function() {
    this.$el.find('button').html(++this.votes);
  },

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
      '<div class="poll"><button>' + this.model.get('poll') + '</button></div>'
    );
    return this;
  },

  renderChart: function() {
    this.$el.append(
      '<div class="poll"><button>' + this.model.get('poll') + '</button></div>'
    );
    return this;
  },

  renderText: function() {
    this.$el.append(
      '<div class="poll"><button>' + this.model.get('poll') + '</button></div>'
    );
    return this;
  }

});