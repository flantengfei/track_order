/**
 * txt web page parser
 */
(function(global){
  
  var file_parser = function() {
    this.file_content = '';
    this.file_object = {};
    this.collected_data = [];
  };
  
  file_parser.prototype = {
    
    analyze: function(file_content, file_name) {
      this.file_content = file_content;
      this.parse_file();
      this.collected_data = this.collect_customer_id();
      global.database_handler.insert_data(this.collected_data, file_name);
    },
    
    parse_file: function() {
      this.file_object = $(this.file_content);
    },
    
    /* retrieve customer id from dom file object */
    collect_customer_id: function() {
      var data = [];
      if(this.file_object.find("tr input.cust-id").length === 0) {
        console.log("Can not caputre cust-id data from page.");
        return false;
      }

      this.file_object.find("tr input.cust-id").each(function(){
        if($(this).closest("tr").find("a[href^='https://sellercentral.amazon.com/hz/orders/']").length === 0){
          console.log("Can not capture order number from page.");
          return false;
        }
        
        var id = $(this).val();
        if(id !== '') {
          data.push({
            _id:          id,
            order_number: $(this).closest("tr").find("a[href^='https://sellercentral.amazon.com/hz/orders/']").text()
          });
        }
      });
      return data;
    }
  };
  
  global.file_parser = new file_parser();
  
})(this);