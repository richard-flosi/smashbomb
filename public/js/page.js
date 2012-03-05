$(document).ready(function() {
  // open external links in a new window
  $('a[rel="external"]').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.open(this.href, '_blank');
  });
});