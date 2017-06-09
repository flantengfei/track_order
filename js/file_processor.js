/**
 * processing file
 */
(function(global){

  var file_processing_handler = function() {
    this.init();
  };

  file_processing_handler.prototype = {

    init: function() {
      this.file_total_precount = 0;
      this.num_file_processed = 0;
      this.collected_file_data = [];
      this.reader_executing = 0;
    },

    process: function(file) {
      //this.file_total_precount++; // precound add up faster than num_file_processed

      if(file.name.indexOf('.json') >= 0){
        this.process_json_data_import_file(this, file);
      }else if ((file.name.indexOf('.txt') >= 0 || file.name.indexOf('.html')) && file.type === 'text/plain'){
        this.process_html_page_file(this, file);
      } else {
        var obj = this;
        setTimeout(function(){ // wait 1 sec to execute for file_total_precount catch up
          obj.process_illegal_file(obj, file);
        }, 1000);
      }
    },

    process_json_data_import_file: function(obj, file) {
      var reader = new FileReader();
      reader.readAsText(file);
      this.reader_executing++;
      console.log('##reader_executing: '+this.reader_executing);
      reader.onloadend = function(){
        window.database_handler.import_record(jQuery.parseJSON(reader.result), file.name);
        obj.num_file_processed++;

        obj.reader_executing--;
        console.log('##reader_executing: '+obj.reader_executing);

        obj.check_process_progress();
      };
    },

    /**
     * when processed file = file precount
     * the program might call 'reset all status' early
     */
    process_illegal_file: function(obj, file) {
      window.activity_log.display_file_parse_error(file.name);
      window.database_handler.file_cannot_read++;
      obj.num_file_processed++;
      obj.check_process_progress();
    },

    process_html_page_file: function(obj, file) {
      var reader = new FileReader();
      reader.readAsText(file);
      this.reader_executing++;
      console.log('##reader_executing: '+this.reader_executing);
      reader.onloadend = function() {
        obj.num_file_processed++;
        obj.collected_file_data.push(window.file_parser.get_data(reader.result, file.name));
        console.log('current total precount: ' + obj.file_total_precount + ' | ' + 'file been processed: ' + obj.num_file_processed);
        obj.process_notification(obj.num_file_processed, file.name);

        obj.reader_executing--;
        console.log('##reader_executing: '+obj.reader_executing);

        obj.check_process_progress();
      };
    },

    /* if all file has been processed then start exeucte save to database */
    check_process_progress: function() {
      if( (this.file_total_precount === this.num_file_processed)
          && (this.reader_executing === 0)
      ) {
        this.custom_notification('Getting Ready to Save File Data...');
        this.execute_saving(); // all files has been processed, put data in database now
      }
    },

    execute_saving: function() {
      if(this.collected_file_data.length === 0) { // only illegal file dropped
        window.check_process_status(false);
        return false;
      }

      for(var i = 0; i < this.collected_file_data.length; i++) {
        window.database_handler.insert_data(
          this.collected_file_data[i].data,     // file data content
          this.collected_file_data[i].file_name // file name string
        );
      }
    },

    process_notification: function(num, file_name) {
      this.remain_notification();
      $('.left_side_container .loading-message span:visible').html('&nbsp; Processing File No.' + num + ' (' + file_name + ')');
    },

    saving_data_notification: function(num, file_name) {
      this.remain_notification();
      $('.left_side_container .loading-message span:visible').html('&nbsp; Saving File No.' + num + ' (' + file_name + ')');
    },

    custom_notification: function(message) {
      this.remain_notification();
      $('.left_side_container .loading-message span:visible').html('&nbsp; ' + message);
    },

    remain_notification: function() {
      if($('.left_side_container .loading-message span:visible').length === 0) {
        App.blockUI({
          target: '.left_side_container',
          boxed: true,
          message: 'Initializing File Processor... '
        });
      }
    }

  };

  window.file_processing_handler = new file_processing_handler();

})(this);
