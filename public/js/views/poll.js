Spty.Views.Poll = Backbone.View.extend({
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
    var buttonView = new Spty.Views.Btn({model: new Spty.Models.Btn()});
    
    this.$el.attr('data-poll', this.cid).append(buttonView.render().el);
    return this;
  }

});