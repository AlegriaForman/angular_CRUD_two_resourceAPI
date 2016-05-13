const angular = require('angular');
const demoApp = angular.module('demoApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors  = (this.errors || []).push(error);
};

demoApp.controller('JawasController', ['$http', function($http) {
  this.jawas = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/jawas')
      .then((res) => {
        this.jawas = res.data;
      }, handleError.bind(this));
  };

  this.createJawa = () => {
    $http.post(baseUrl + '/api/jawas', this.newJawa)
      .then((res) => {
        this.jawas.push(res.data);
        this.newJawa = null;
      }, handleError.bind(this));
  };

  this.updateJawa = (jawa) => {
    $http.put(baseUrl + '/api/jawas/' + jawa._id, jawa)
      .then(() => {
        jawa.editing = false;
      }, handleError.bind(this));
  };

  this.removeJawa = (jawa) => {
    $http.delete(baseUrl + '/api/jawas/' + jawa._id)
      .then(() => {
        this.jawas.splice(this.jawas.indexOf(jawa), 1);
      }, handleError.bind(this));
  };
}]);

demoApp.controller('DroidsController', ['$http', function($http) {
  this.droids = [];
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
}]);
