var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('DroidsController', ['$http', 'jawoidHandleError', function($http, jawoidHandleError) {
    this.droids = [];
    this.errors = [];
    var originalDroid = {};

    this.getAll = function() {
      $http.get(baseUrl + '/api/droids')
        .then((res) => {
          this.droids = res.data;
        }, jawoidHandleError(this.errors, 'could not get all droid'));
    }.bind(this);
    this.createDroid = function() {
      var droidName = this.newDroid.name;
      $http.post(baseUrl + '/api/droids', this.newDroid)
        .then((res) => {
          this.droids.push(res.data);
          this.newDroid = null;
        }, jawoidHandleError(this.errors, 'couls not create' + droidName));
    }.bind(this);
    this.updateDroid = function(droid) {
      $http.put(baseUrl + '/api/droids/' + droid._id, droid)
        .then(() => {
          droid.editing = false;
        }, jawoidHandleError(this.errors, 'could not update' + droid.name));
    }.bind(this);
    this.removeDroid = function(droid) {
      $http.delete(baseUrl + '/api/droids/' + droid._id)
        .then(() => {
          this.droids.splice(this.droids.indexOf(droid), 1);
        }, jawoidHandleError(this.errors, 'could not delete' + droid.name));
    }.bind(this);
    this.cancelDroid = function(droid) {
      droid.editing = false;
      droid.name = originalDroid.name;
      droid.address = originalDroid.address;
      droid.email = originalDroid.email;
    };
    this.editDroid = function(droid) {
      droid.editing = true;
      originalDroid.name = droid.name;
      originalDroid.address = droid.address;
      originalDroid.email = droid.email;
    };
  }]);
};
