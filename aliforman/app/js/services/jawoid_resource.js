module.exports = function(app) {
  app.factory('jawoidResource', ['$rootScope', '$http', 'jawoidHandleError',
    function($rs, $http, jawoidErr) {
      var Resource = function(resourceArr, errorsArr, baseUrl, options) {
        this.data = resourceArr;
        this.url = baseUrl;
        this.errs = errorsArr;
        this.opts = options || {};
        this.opts.errMess = this.opts.errMess || {};
      };

      Resource.prototype.getAll = function() {
        return $http.get(this.url)
          .then((res) => {
            this.data.splice(0);
            for (var i = 0; i < res.data.length; i++) //eslint-disable-line
              this.data.push(res.data[i]);
          }, jawoidErr(this.errs, this.opts.errMess.getAll || 'Could not GET resource.'));
      };

      Resource.prototype.save = function(resource) {
        return $http.post(this.url, resource)
          .then((res) => {
            this.data.push(res.data);
          }, jawoidErr(this.errs, this.opts.errMess.save || 'Could not SAVE resource.'));
      };

      Resource.prototype.update = function(resource) {
        return $http.put(this.url + '/' + resource._id, resource)
          .catch(jawoidErr(this.errs, this.opts.errMess.update || 'Could not UPDATE resource.'));
      };

      Resource.prototype.remove = function(resource) {
        return $http.delete(this.url + '/' + resource._id)
          .then(() => {
            this.data.splice(this.data.indexOf(resource), 1);
          }, jawoidErr(this.errs, this.opts.errMess.remove || 'Could not REMOVE the resource.'));
      };
      return Resource;
    }]);
};
