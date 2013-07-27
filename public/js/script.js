window.App = {
  Vent: _.extend({}, Backbone.Events),
  slides : [
    {title: 'My Presentation'},
    {image: 'http://barrymwong.com/images/pacific_ave.jpg'},
    {image: 'http://mathblag.files.wordpress.com/2011/11/fibonacci_pigeons.jpg'},
    {image: 'https://i.chzbgr.com/maxW500/7670554368/hA827CEEC/'},
    {title: 'Hello Wrrld!!!'}, 
    {title: 'Errmergerrd!'}
  ]
};
var appView = new AppView();