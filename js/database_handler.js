/**
 * handle access and store customer ID, order number data
 */
(function(global){
  
  /* display file data process status */
  var message_handler = function(response, file_name) {
    var success = 0;
    for(var i = 0; i < response.length; i++) {
      if(typeof response[i].ok !== 'undefined' && response[i].ok === true) {
        success++;
      }
    }
    
    new PNotify({
      title: success + ' customer order records has been added from ' + file_name,
      addclass: 'bg-success'
    });
  };
  
  /* if all file has been processed, remove files on dropzone */
  var check_process_status = function() {
    global.database_handler.number_data_saved++;
    
    if (global.dropzone_global.files.length === global.database_handler.number_data_saved) {
      global.dropzone_global.removeAllFiles(true); // clear files uploaded
      global.database_handler.number_data_saved = 0; // reset
    }
  };
  
  var database_handler = function() {
    this.db = new PouchDB('customer_order'); // db.destroy(''customer_order'');
    this.number_data_saved = 0;
  };
  
  database_handler.prototype = {
    
    insert_data: function(data, file_name) {
      /* insert multiple data records all in once */
      this.db.bulkDocs(data, function(err, response) {
        check_process_status();
        message_handler(response, file_name);
      });
    },
    
    search_order: function(customer_id) {
      customer_id = $.trim(customer_id);
      this.db.get(customer_id, function(err, doc) {
        if (err) { 
          $('#customer_order_number').html('No Record Found');
        }
        $('#customer_order_number').html(doc.order_number);
      });
    }
    
  };
  
  global.database_handler = new database_handler();
  
})(this);