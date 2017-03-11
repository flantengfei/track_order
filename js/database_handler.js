/**
 * handle access and store customer ID, order number data
 */
(function(global){
  
  /* display file data process status */
  var message_handler = function(response) {
    var success = 0;
    for(var i = 0; i < response.length; i++) {
      if(typeof response[i].ok !== 'undefined' && response[i].ok === true) {
        success++;
      }
    }
    
    new PNotify({
      title: success+' customer order records has been added',
      addclass: 'bg-success'
    });
  };
  
  var database_handler = function() {
    this.db = new PouchDB('customer_order'); // db.destroy(''customer_order'');
    this.order_number = '';
  };
  
  database_handler.prototype = {
    
    insert_data: function(data) {
      var num_of_record = data.length;
      
      /* insert multiple data records all in once */
      this.db.bulkDocs(data, function(err, response) {
        //console.log(err);
        //console.log(response);
        message_handler(response);
      });
    },
    
    search_order: function(customer_id) {
      customer_id = $.trim(customer_id);
      this.db.get(customer_id, function(err, doc) {
        if (err) { 
          $('#customer_order_number').html('No Record Found');
          return console.log(err); 
        }
        $('#customer_order_number').html(doc.order_number);
      });
    }
    
  };
  
  global.database_handler = new database_handler();
  
})(this);