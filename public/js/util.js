var util = {
  partial: function (func /*, 0..n args */) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
      var allArguments = args.concat(Array.prototype.slice.call(arguments));
      return func.apply(this, allArguments);
    };
  },
  repeat_string: function(s, n) {
    // s is the string to repeat
    // n is the number of times to repeat the string
    var a = [];
    while (a.length < n) {
      a.push(s);
    }
    return a.join('');
  }
};