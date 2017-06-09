//var PouchDB = require('pouchdb');
//var replicationStream = require('pouchdb-replication-stream');

$(function(){

  var SelectText = function(element) {
    var doc = document;
    var text = doc.getElementById(element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
  };

  $(document).off('.main_ui_listener');

  /* search order number */
  $(document).on('click.main_ui_listener', '#search_order_btn', function(){
    window.database_handler.search_order($('#customer_id').val());
  });

  $(document).on('keypress.main_ui_listener', '#customer_id', function(e){
    if(e.which === 13) {
      window.database_handler.search_order($('#customer_id').val());
    }
  });

  $(document).on('focus.main_ui_listener', '#customer_id', function(e){
    $(this).select();
  });

  /* click highlight order number */
  $(document).on('click.main_ui_listener', '#customer_order_number', function(e){
    SelectText('customer_order_number');
  });

  window.dropzone_global = new Dropzone("#file_dropzone", {
    parallelUploads: 1,

    drop: function(event) {
      App.blockUI({
        target: '.left_side_container',
        boxed: true,
        message: 'Initializing File Processor... '
      });
    },

    accept: function(file, done) {
      window.file_processing_handler.file_total_precount++;
      window.file_processing_handler.process(file);
      window.dropzone_global.removeFile(file);
    }
  });


});
