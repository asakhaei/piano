
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Playing Piano' });
};


exports.piano = function(req, res){
  res.render('piano', { title: 'Playong Piano' });
};
