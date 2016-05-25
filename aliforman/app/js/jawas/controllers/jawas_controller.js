var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('JawasController', ['$http', 'jawoidHandleError', function($http, jawoidHandleError) {
    this.jawas = [];
    this.errors = [];
    var originalJawa = {};

    this.getAll = function() {
      $http.get(baseUrl + '/api/jawas')
        .then((res) => {
          this.jawas = res.data;
        }, jawoidHandleError(this.errors, 'could not get all jawa'));
    }.bind(this);
    this.createJawa = function() {
      var jawaName = this.newJawa.name;
      $http.post(baseUrl + '/api/jawas', this.newJawa)
        .then((res) => {
          this.jawas.push(res.data);
          this.newJawa = null;
        }, jawoidHandleError(this.errors, 'could not create' + jawaName));
    }.bind(this);
    this.updateJawa = function(jawa) {
      $http.put(baseUrl + '/api/jawas/' + jawa._id, jawa)
        .then(() => {
          jawa.editing = false;
        }, jawoidHandleError(this.errors, 'could not update' + jawa.name));
    }.bind(this);
    this.removeJawa = function(jawa) {
      $http.delete(baseUrl + '/api/jawas/' + jawa._id)
        .then(() => {
          this.jawas.splice(this.jawas.indexOf(jawa), 1);
        }, jawoidHandleError(this.errors, 'could not delete' + jawa.name));
    }.bind(this);
    this.cancelJawa = function(jawa) {
      jawa.editing = false;
      jawa.name = originalJawa.name;
      jawa.address = originalJawa.address;
      jawa.email = originalJawa.email;
    };
    this.editJawa = function(jawa) {
      jawa.editing = true;
      originalJawa.name = jawa.name;
      originalJawa.address = jawa.address;
      originalJawa.email = jawa.email;
    };
  }]);
};
