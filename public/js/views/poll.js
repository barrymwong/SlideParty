var PollView = Backbone.View.extend({
  className: 'poll',

  render: function() {
    this.renderPoll();
    return this;
  },

  renderPoll: function() {
    this.$el.append(
      '<div class="poll">' + this.model.get('type') + '</div>'
    );
    return this;
  }

});