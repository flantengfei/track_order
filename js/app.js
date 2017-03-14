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
  
});

/*

App.blockUI({
  target: '.left_side_container',
  boxed: true,
  message: 'Processing...'
});

App.unblockUI('.left_side_container');

*/
//A1H6YNEBZ3JQUI