exports.index = function(req, res){
  res.render('index', {title: 'SmashBomb'});
};
exports.smashbomb_backbone = function(req, res){
  res.render('smashbomb_backbone', {title: 'SmashBomb Backbone.js'});
};
exports.jquery_smash = function(req, res){
  res.render('jquery_smash', {title: 'jquery.smash.js'});
};
exports.about = function(req, res){
  res.render('about', {title: 'About'});
};
exports.todo = function(req, res){
  res.render('todo', {title: 'ToDo'});
};