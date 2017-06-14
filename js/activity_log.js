/*
 * activity log display handler
 */

(function(global){
  var activity_log_handler = function() {
    this.log_list = 'div.slimScrollDiv ul.feeds';
  };

  activity_log_handler.prototype = {

    display_search: function(customer_id, order_number) {

      var html =      '<li>';
          html +=        '<div class="col1">';
          html +=          '<div class="cont">';
          html +=            '<div class="cont-col1">';
          html +=              '<div class="label label-sm label-info">';
          html +=                '<i class="fa fa-search"></i>';
          html +=              '</div>';
          html +=            '</div>';
          html +=            '<div class="cont-col2">';
          html +=              '<div class="desc"> Search customer ID '+customer_id+' found order number '+order_number+' </div>';
          html +=            '</div>';
          html +=          '</div>';
          html +=        '</div>';
          html +=      '</li>';

      $('.scroller').slimScroll({ scrollTo : '0px' });
      $(this.log_list).prepend(html);
    },

    display_no_record: function(customer_id) {
      var html =      '<li>';
          html +=        '<div class="col1">';
          html +=          '<div class="cont">';
          html +=            '<div class="cont-col1">';
          html +=              '<div class="label label-sm label-warning">';
          html +=                '<i class="fa fa-warning"></i>';
          html +=              '</div>';
          html +=            '</div>';
          html +=            '<div class="cont-col2">';
          html +=              '<div class="desc"> Search customer ID '+customer_id+' no record found </div>';
          html +=            '</div>';
          html +=          '</div>';
          html +=        '</div>';
          html +=      '</li>';

      $('.scroller').slimScroll({ scrollTo : '0px' });
      $(this.log_list).prepend(html);
    },

    display_file_parse_error: function(file_name) {
      var html =      '<li>';
          html +=        '<div class="col1">';
          html +=          '<div class="cont">';
          html +=            '<div class="cont-col1">';
          html +=              '<div class="label label-sm label-danger">';
          html +=                '<i class="fa fa-close"></i>';
          html +=              '</div>';
          html +=            '</div>';
          html +=            '<div class="cont-col2">';
          html +=              '<div class="desc"> Can not read file '+file_name+' </div>';
          html +=            '</div>';
          html +=          '</div>';
          html +=        '</div>';
          html +=      '</li>';

      $('.scroller').slimScroll({ scrollTo : '0px' });
      $(this.log_list).prepend(html);
    },

    display_file_parse_success: function(num_record_captured, file_name, total_record_from_file) {
      var html =      '<li>';
          html +=        '<div class="col1">';
          html +=          '<div class="cont">';
          html +=            '<div class="cont-col1">';
          html +=              '<div class="label label-sm label-success">';
          html +=                '<i class="fa fa-bar-chart-o"></i>';
          html +=              '</div>';
          html +=            '</div>';
          html +=            '<div class="cont-col2">';
          html +=              '<div class="desc"> '+num_record_captured+' out of '+total_record_from_file+' records captured from file '+file_name+' </div>';
          html +=            '</div>';
          html +=          '</div>';
          html +=        '</div>';
          html +=      '</li>';

      $('.scroller').slimScroll({ scrollTo : '0px' });
      $(this.log_list).prepend(html);
    },

    display_database_export: function(num_record_exported) {
      var html =      '<li>';
          html +=        '<div class="col1">';
          html +=          '<div class="cont">';
          html +=            '<div class="cont-col1">';
          html +=              '<div class="label label-sm label-default">';
          html +=                '<i class="fa fa-database"></i>';
          html +=              '</div>';
          html +=            '</div>';
          html +=            '<div class="cont-col2">';
          html +=              '<div class="desc"> '+num_record_exported+' records been exported to data.json </div>';
          html +=            '</div>';
          html +=          '</div>';
          html +=        '</div>';
          html +=      '</li>';

      $('.scroller').slimScroll({ scrollTo : '0px' });
      $(this.log_list).prepend(html);
    }
  };

  global.activity_log = new activity_log_handler();

//  window.activity_log.display_search()
//  window.activity_log.display_no_record()
//  window.activity_log.display_file_parse_error()
//  window.activity_log.display_file_parse_success()
//  window.activity_log.display_database_export()
})(this);
