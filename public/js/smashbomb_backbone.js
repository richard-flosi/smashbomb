$(document).ready(function() {
  window.SmashBomb = Backbone.Model.extend({
    // Default attributes for a smashbomb.
    defaults: function() {
      return {
        events: {
          keypresses: []
        }
      };
    },
    keypress_log: function(event) {
      this.save({events: {
        keypresses: this.get("events.keypresses").push(event)
      }});
    }
  });

  window.SmashBombList = Backbone.Collection.extend({
    model: SmashBomb,
    localStorage: new Store("smashbomb"), // smashbomb namespace
  });

  window.SmashBomb = new SmashBombList;

  window.SmashBombView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#item-template').html()),
    events: {},
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    },
    setText: function() {
      var text = this.model.get('text');
      this.text(text);
    }
  });

  window.AppView = Backbone.View.extend({
    el: $("#smashbombapp"),
    // statsTemplate: _.template($('#stats-template').html()),
    events: {},
    initialize: function() {
      SmashBomb.fetch();
    },
    render: function() {
      // this.$('#todo-stats').html(this.statsTemplate({
      //   total:      Todos.length,
      //   done:       Todos.done().length,
      //   remaining:  Todos.remaining().length
      // }));
    },
    addOne: function(todo) {
      var view = new SmashBombView({model: smashbomb});
      $("#smashbombapp").append(view.render().el);
    }
  });
  window.App = new AppView;
});