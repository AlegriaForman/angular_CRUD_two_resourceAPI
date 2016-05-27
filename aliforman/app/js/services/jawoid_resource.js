module.exports = function(app) {
  app.factory('jawoidResource', ['$http', 'jawoidHandleError', function($http, jawoidError) {
    var Resource = function(resourceArr, errorsArr, baseUrl, options) {
      this.data = resourceArr;
      this.url = baseUrl;
      this.errors = errorsArr;
      this.options = options || {};
      this.options.errMessages = this.options.errMessages || {};
    };

    Resource.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.splice(0);
          for(var i = 0; i < res.data.length; i++)
            this.data.push(res.data[i]);
        }, jawoidError(this.errors, this.options.errMessages.getAll ||'Could not GET resource.'));
    };

    Resource.prototype.save = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, jawoidError(this.errors, this.options.errMessages.save || 'Could not SAVE resource.'));
    };

    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
        .catch(jawoidError(this.errors, this.options.errMessages.update ||'Could not UPDATE resource.'));
    };

    Resource.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
        .then(() => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, jawoidError(this.errors, this.options.errMessages.remove || 'Could not REMOVE the resource.'));
    };
    return Resource;
  }]);
};
