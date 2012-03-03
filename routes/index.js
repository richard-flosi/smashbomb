exports.index = function(req, res){
  res.render('index', {title: 'SmashBomb'})
};
exports.about = function(req, res){
  res.render('about', {title: 'About'})
};