/**
 * handle access and store customer ID, order number data
 */
(function(global){
  
  var database_handler = function() {
    this.db = new PouchDB('customer_order'); // db.destroy(''customer_order'');
  };
  
  database_handler.prototype = {
    
    insert_data: function(data) {
      var num_of_record = data.length;
      var duplicate = 0;
      var inserted = 0;
      
      console.log(num_of_record + ' data record captured from file');
      
      /* insert multiple data records all in once */
      this.db.bulkDocs(data, function(err, response) {
        console.log(err);
        //console.log((num_of_record - err.length) + ' data record successfully inserted');
        console.log(response);
      });
      
//      for (var i = 0; i < data.length; i++) {
//        this.db.put(data[i]).then(function (response) {
//          inserted++;
//          console.log(response);
//          console.log("Order data captured.");
//        }).catch(function (err) {
//          duplicate++;
//          console.log(err);
//        }).on('complete', function(){
//          alert('insert completed');
//          console.log(duplicate + ' duplicate record');
//          console.log(inserted + ' inserted record');
//        });
//      }
    }
    
  };
  
  global.database_handler = new database_handler();
  
})(this);