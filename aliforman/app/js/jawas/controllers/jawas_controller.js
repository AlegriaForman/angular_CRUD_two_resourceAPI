const angular = require ('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('JawasController', ['jawoidResource', function(Resource) {
    this.jawas = [];
    this.errors = [];
    var originalJawa = {};
    var remote = new Resource(this.jawas, this.errors, baseUrl + '/api/jawas', {errMessages: {getAll: 'custom error message'}});
    this.getAll = remote.getAll.bind(remote);
    this.createJawa = function() {
      remote.save(this.newJawa)
        .then(() => {
          this.newJawa = null;
        });
    }.bind(this);
    this.updateJawa = function(jawa) {
      remote.update(jawa)
        .then(() => {
          jawa.editing = false;
        });
    };
    this.removeJawa = remote.remove.bind(remote);
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
