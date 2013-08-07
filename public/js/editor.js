(function() {
  var defaultTitle = $('#edit-title').html();
  var defaultHtml = $('#edit-html').html();

  var success = function(data) {
    var loc = location.href.split('/edit');
    location.href = loc[0];
  };

  var $contEdit = $('[contenteditable=true]');

  var copyToHidden = function() {
    $contEdit.each(function(index) {
      var $item = $contEdit.eq(index);
      $('#' + $item.data('edit')).val($item.html());
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();
    copyToHidden();

    if(defaultTitle !== $('#data-title').val() && defaultHtml !== $('#data-html').val()) {
      $.ajax({
        type: 'POST',
        url: '/edit',
        data: $(this).serialize(),
        dataType: 'text',
        success: success
      });
    }
  });
}());