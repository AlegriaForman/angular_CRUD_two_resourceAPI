var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('JawasController', ['$http', function($http) {
    this.jawas = [];
    var originalJawa = {};

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
    this.cancelJawa = (jawa) => {
      jawa.editing = false;
      jawa.name = originalJawa.name;
      jawa.address = originalJawa.address;
      jawa.email = originalJawa.email;
    };
    this.editJawa = (jawa) => {
      jawa.editing = true;
      originalJawa.name = jawa.name;
      originalJawa.address = jawa.address;
      originalJawa.email = jawa.email;
    };
  }]);
};
