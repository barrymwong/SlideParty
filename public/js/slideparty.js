window.App = {
  Vent: _.extend({}, Backbone.Events),
  slides: [
    {title: 'SlideParty'}
  ],
  noHijack: true
};
var appView = new AppView();