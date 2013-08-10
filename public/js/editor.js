var SpEdit = function() {
  this.$defaultTitle = $('#create-title').html();
  this.$defaultHtml = $('#create-html').html();
  this.$contEdit = $('[contenteditable=true]');
  this.doPost();
};

SpEdit.prototype.success = function() {
  var loc = location.href.split('/create');
  location.href = loc[0];
};

SpEdit.prototype.copyToHidden = function() {
  var that = this;
  this.$contEdit.each(function(index) {
    var $item = that.$contEdit.eq(index);
    $('#' + $item.data('create')).val($item.html());
  });
};

SpEdit.prototype.doPost = function() {
  var that = this;
  $('form').on('submit', function(e) {
    e.preventDefault();
    that.copyToHidden();

    if(that.$defaultTitle !== $('#data-title').val() && that.$defaultHtml !== $('#data-html').val()) {
      $.ajax({
        type: 'POST',
        url: '/create',
        data: $(this).serialize(),
        dataType: 'text',
        success: that.success
      });
    }
  });
};
