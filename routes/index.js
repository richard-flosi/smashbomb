exports.index = function(req, res){
  res.render('index', {title: 'SmashBomb'})
};
exports.about = function(req, res){
  res.render('about', {title: 'About'})
};
exports.todo = function(req, res){
  res.render('todo', {title: 'ToDo'})
};