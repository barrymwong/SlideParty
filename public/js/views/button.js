var ButtonView = Backbone.View.extend({
  tagName: 'button',

  initialize: function() {
    this.className = this.cid;
    App.Vent.on('updateVote', this.updateVote, this);
  },

  events: {
    'click': 'onVote'
  },

  onVote: function() {
    var data = {};
    data[this.cid] = 1;
    socket.emit('vote', data);
    return this;
  },

  updateVote: function(data) {
    console.log(this);
    for(var key in data) {
      if(this.cid === key){
        $('button#' + key).html(data[key]);
      }
    }
    return this;
  },

  render: function() {
    this.$el.attr({id: this.cid}).append(this.cid);
    return this;
  }
});