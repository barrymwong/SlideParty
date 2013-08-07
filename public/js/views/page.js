var PageView = Backbone.View.extend({
  className: 'login'
  render: function() {
    var model = new EditorModel();
    this.$el.append(
      '<h1>Login</h1>' +
      '<input type="text" placeholder="username">' +
      '<input type="password" placeholder="password">' +
      '<button type="submit">Submit</button>'
    );
  }
});