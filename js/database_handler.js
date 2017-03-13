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
    
    window.activity_log.display_file_parse_success(success, file_name);
  };
  
  /* if all file has been processed, remove files on dropzone */
  var check_process_status = function() {
    global.database_handler.number_data_saved++;
    
    /* data parse finish and clear dropzone */
    if (global.dropzone_global.files.length === (global.database_handler.number_data_saved + window.database_handler.file_cannot_read)) {
      global.dropzone_global.removeAllFiles(true); // clear files uploaded
      global.database_handler.number_data_saved = 0; // reset
      global.database_handler.file_cannot_read = 0;
    }
  };
  
  var database_handler = function() {
    this.db = new PouchDB('customer_order'); // db.destroy(''customer_order'');
    this.number_data_saved = 0;
    this.file_cannot_read = 0;
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
          window.activity_log.display_no_record(customer_id);
        }else{
          $('#customer_order_number').html(doc.order_number);
          window.activity_log.display_search(customer_id, doc.order_number);
        }
      });
    }
    
  };
  
  global.database_handler = new database_handler();
  
})(this);