CKEDITOR.disableAutoInline = true;

var configTitle = {
  toolbarGroups: [
    { name: 'mode' },
    { name: 'links' },
    { name: 'colors' }
  ],
  extraPlugins: 'sourcedialog',
  removePlugins: 'sourcearea'
};

var configHtml = {
  toolbarGroups: [
    { name: 'mode' },
    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
    { name: 'links' },
    { name: 'insert' },
    { name: 'forms' },
    { name: 'tools' },
    { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
    { name: 'others' },
    '/',
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
    { name: 'styles' },
    { name: 'colors' }
  ],
  extraPlugins: 'sourcedialog',
  removePlugins: 'sourcearea'
};

try {
  CKEDITOR.inline( 'edit-title', configTitle );
  CKEDITOR.inline( 'edit-html', configHtml );
} catch(e) {
  console.log('hello');
}