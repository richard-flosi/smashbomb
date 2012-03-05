
var smashbomb = {
  // default config
  burn_rate: 50,
  fuse_selector: '#fuse',
  keypress_log: null,
  keypress_log_line: null,
  keypress_log_current: null,
  // If you stop typing for more than 200 millisecond,
  // your smash is considered complete.
  keypress_time_diff: 200,
  keypresses_selector: '#keypresses',
  smash_selector: '#smash',
  // You have 1 seconds to complete your smash.
  smash_time: 1000,
  // public variables
  // private variables
  _$fuse: null,
  _$smash: null,
  _first_keypressed: false,
  _previous_keypress: null,
  _intervals: {
    fuse: null
  },
  _timeouts: {
    countdown: null
  },
  // private functions
  _block: function(self) {
    if (self._timeouts.countdown) {
      clearTimeout(self._timeouts.countdown);
    }
    self._disable(self);
    alert('blckd!');
  },
  _burn: function(self) {
    var fuse_text = self._$fuse.html();
    var fuse_index = fuse_text.indexOf('-');
    if (fuse_index != -1) {
      self._$fuse.html(util.repeat_string('.', fuse_index+1) + fuse_text.slice(fuse_index+1));
    }
  },
  _disable: function(self) {
    self._$smash.blur().attr('disabled', 'disabled');
  },
  _end: function(self) {
    clearInterval(self._intervals.fuse);
    if (self._timeouts.countdown) {
      clearTimeout(self._timeouts.countdown);
    }
    self._disable(self);
    self._explode(self);
    self._validate(self);
  },
  _explode: function(self) {
    self._$fuse.html(util.repeat_string('.', self.burn_rate) + 'x');
  },
  _init: function(self, config) {
    var config_keys = [
      'burn_rate',
      'fuse_selector',
      'keypress_time_diff',
      'smash_selector',
      'smash_time'
    ];
    if (config) {
      for (var i in config_keys) {
        if (_.has(config, config_keys[i])) {
          self[config_keys[i]] = config[config_keys[i]];
        }
      }
    }
    self._$fuse = $(self.fuse_selector);
    self._$smash = $(self.smash_selector);
    self.keypress_log = new Log;
    self.keypress_log_line = new LogLine;
    self.keypress_log_current = new LogCurrent;
  },
  _validate: function(self) {
    var errors = false;
    var smash = self._$smash.val();
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
  },
  // public functions
  start: function(config) {
    var self = this;
    self._init(self, config);

    // initialize fuse
    self._$fuse.html(util.repeat_string('-', self.burn_rate));

    // TODO: move to validation rule? how does this fit in?
    self._$smash.on('paste', function(event) {
      self._block(self);
    });

    // find keypresses_selector to ds.keypress_events
    self.keypress_log.on('change:events', function(model, index) {
      self.keypress_log_line.render(model.events[index-1]);
      self.keypress_log_current.render(model.events[index-1]);
      // console.log(model);
      // console.log(events);
      // console.log(this);
      // console.log(self);
    }, self);

    // move anonymous function to a private function? is this part of validation?
    self._$smash.on('keypress', function(event) {
      self.keypress_log.set({events: self.keypress_log.events.push(event)});
      if (!self._first_keypressed) {
        self._first_keypressed = true;
        self._timeouts.countdown = setTimeout(
          _.delay(self._end, self.smash_time, self));
        self._intervals.fuse = setInterval(
          util.partial(self._burn, self), self.smash_time/self.burn_rate);
      }
      if (self._previous_keypress) {
        var time_diff = event.timeStamp - self._previous_keypress.timeStamp;
        // rework this to use setTimeout/clearTimeout
        // this way if they stop typing for more than 200 milliseconds we can call _end()
        if (time_diff > self.keypress_time_diff) {
          self._end(self);
        }
      }
      self._previous_keypress = event;
    });

    // set focus
    self._$smash.focus();
  }
};

var Log = Backbone.Model.extend({
  events: [],
  push: function() {
    console.log(this);
  }
});

var LogLine = Backbone.View.extend({
  el: '#log',
  // model: smashbomb.keypress_log,
  render: function(event) {
    // $(this.el).html(_.template(this.model.toJSON()));
    $(this.el).append('<div class="log_line">' + new Date(event.timeStamp).toUTCString() + ' ' + event.timeStamp + ' ' + String.fromCharCode(event.which) + ' ' + event.which + '</div>');
    return this;
  }
});

var LogCurrent = Backbone.View.extend({
  el: '#current',
  // model: smashbomb.keypress_log,
  render: function(event) {
    // $(this.el).html(_.template(this.model.toJSON()));
    $(this.el).html(String.fromCharCode(event.which)); // get the actual letter
    return this;
  }
});