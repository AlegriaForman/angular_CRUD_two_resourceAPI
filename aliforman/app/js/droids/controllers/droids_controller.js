var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('DroidsController', ['$http', function($http) {
    this.droids = [];
    var originalDroid = {};

    this.getAll = () => {
      $http.get(baseUrl + '/api/droids')
        .then((res) => {
          this.droids = res.data;
        }, handleError.bind(this));
    };
    this.createDroid = () => {
      $http.post(baseUrl + '/api/droids', this.newDroid)
        .then((res) => {
          this.droids.push(res.data);
          this.newDroid = null;
        }, handleError.bind(this));
    };
    this.updateDroid = (droid) => {
      $http.put(baseUrl + '/api/droids/' + droid._id, droid)
        .then(() => {
          droid.editing = false;
        }, handleError.bind(this));
    };
    this.removeDroid = (droid) => {
      $http.delete(baseUrl + '/api/droids/' + droid._id)
        .then(() => {
          this.droids.splice(this.droids.indexOf(droid), 1);
        }, handleError.bind(this));
    };
    this.cancelDroid = (droid) => {
      droid.editing = false;
      droid.name = originalDroid.name;
      droid.address = originalDroid.address;
      droid.email = originalDroid.email;
    };
    this.editDroid = (droid) => {
      droid.editing = true;
      originalDroid.name = droid.name;
      originalDroid.address = droid.address;
      originalDroid.email = droid.email;
    };
  }]);
};
