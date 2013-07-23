var SlidesView = Backbone.View.extend({
	className: 'slides',

	initialize: function() {
		this.renderAll();
	},

	renderAll: function() {
		this.collection.each(this.render, this)
	},

	render: function() {
		var slideView = new SlideView({model: SlideModel});
		this.$el.append(this.model.render().el);
		return this;
	}
});