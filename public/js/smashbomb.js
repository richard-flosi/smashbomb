var sb = {};
sb.init = function() {
  // open external links in a new window
  $('a[rel="external"]').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.open(this.href, '_blank');
  });
  
  // initialize smash input field
  $('#smash').dPassword({showIcon: false});
  $('#smash').on('keypress', function(event) {
      console.log(event);
  });
  $('#smash').focus();
}

$(document).ready(sb.init);
