var sb = {};
sb.init = function() {
  // open external links in a new window
  $('a[rel="external"]').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.open(this.href, '_blank');
  });
  // initialize fuse
  var fuse;
  var burn_rate = 50;
  function repeat(s, n){
      var a = [];
      while(a.length < n){
          a.push(s);
      }
      return a.join('');
  }
  $('#fuse').html(function() {
    var a = [];
    while (a.length < burn_rate) {
      a.push('-');
    }
    return a.join('');
  }());
  var first_keypressed = false;
  var ds = {
    events: []
  };
  var validate = function() {
    var errors = false;
    var smash = $('#smash').val();
    if (smash.length < 6) {
      errors = true; // Min 6 characters.
    } else {
      for (var x in smash.slice(2)) {
        if (smash.charAt(x) == smash.charAt(x+1) && smash.charAt(x+1) == smash.charAt(x+2)) {
          errors = true; // Limit of 2 consecutive repeats of a character.
          break;
        }
      }
      if (!errors) {
        // Not a word.
        //    * Requires a dictionary for each supported language.
      }
    }
    if (errors) {
      alert('nvld!');
    }
  };
  var disable_form = function() {
    $('#smash').blur().attr('disabled', 'disabled');
  };
  var end = function() {
    clearInterval(fuse);
    if (countdown) {
      clearTimeout(countdown);
    }
    disable_form();
    validate();
  };
  var block = function() {
    if (countdown) {
      console.log('clearing countdown timeout');
      console.log(countdown);
      clearTimeout(countdown);
    }
    disable_form();
    alert('blckd!');
  };
  var burn = function() {
    $('#fuse').html($('#fuse').html().slice(1));
  }
  $('#smash').on('paste', function(event) {
    block();
  });
  var countdown;
  var previous_event;
  $('#smash').on('keypress', function(event) {
    if (!first_keypressed) {
      first_keypressed = true;
      countdown = setTimeout(end, 1000); // You have 1 seconds to complete your smash.
      fuse = setInterval(burn, 1000/burn_rate);
    }
    ds.events.push(event);
    if (previous_event) {
      var time_diff = event.timeStamp - previous_event.timeStamp;
      if (time_diff > 200) {
        end(); // If you stop typing for more than 200 millisecond, your smash is considered complete.
      }
    }
    previous_event = event;
  });
  $('#smash').focus();
}

$(document).ready(sb.init);
