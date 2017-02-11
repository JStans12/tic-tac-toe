var $ = require('jquery');

$(document).ready(function(){
  $('td').click(function(){
    $(this).html('x');
  });
});
