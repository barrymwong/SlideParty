window.App = {
  Vent: _.extend({}, Backbone.Events),
  slides : [
    {title: 'SlideParty'}
  ]
};
var appView = new AppView();