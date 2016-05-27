module.exports = function(app) {
  require('./handle_error')(app);
  require('./jawoid_resource')(app);
};
