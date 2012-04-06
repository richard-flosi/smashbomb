(function($,window,undefined){
  var str_smash = 'smash',
      fake_onsmash,
      special = $.event.special;
  
  $.fn[str_smash] = function(fn) {
    return fn ? this.bind(str_smash, fn) : this.trigger(str_smash);
  };
  
  special[str_smash] = $.extend(special[str_smash], {
    setup: function(config) {
      if (config) {
        if (config.hasOwnProperty('keypress_time_diff')) {
          fake_onsmash.keypress_time_diff = config.keypress_time_diff;
        }
        if (config.hasOwnProperty('smash_time')) {
          fake_onsmash.smash_time = config.smash_time;
        }
      }
      $($.proxy(fake_onsmash.start, this));
    },
    teardown: function() {
      $(fake_onsmash.stop);
    }
  });
  
  fake_onsmash = (function() {
    var self = {
      // default config
      // If you stop typing for more than 200 millisecond,
      // your smash is considered complete.
      keypress_time_diff: 200,
      // You have 1 seconds to complete your smash.
      smash_time: 1000,
      // public variables
      // private variables
      _initialized: false,
      _timeouts: {
        countdown: null,
        end: null
      }
    };
    // private functions
    self._block = function(self) {
      if (self._timeouts.countdown) {
        clearTimeout(self._timeouts.countdown);
      }
      return false;
    };
    self._delay = function(self, func, wait) {
      return setTimeout(function(){ return func.apply(func, [self]); }, wait);
    };
    // public functions
    self.start = function() {
      self.$smash = $(this);

      self.$smash.on('paste', function(event) {
        self._block(self);
      });

      // move anonymous function to a private function? is this part of validation?
      self.$smash.on('keypress', function(event) {
        if (self._timeouts.end) {
          clearTimeout(self._timeouts.end);
        }
        self._timeouts.end = self._delay(self, self.stop, self.keypress_time_diff);
        if (!self._initialized) {
          self._initialized = true;
          self._timeouts.countdown = self._delay(self, self.stop, self.smash_time);
        }
      });
    };
    self.stop = function(self) {
      if (self._timeouts.countdown) {
        clearTimeout(self._timeouts.countdown);
      }
      self.$smash.trigger(str_smash);
    };
    return self;
  })();
})(jQuery, this);