window.App = {
  Vent: _.extend({}, Backbone.Events),
  slides : [
    {title: 'SlideParty JS'}
  ]
};
var appView = new AppView();