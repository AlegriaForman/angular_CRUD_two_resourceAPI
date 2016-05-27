const angular = require ('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('DroidsController', ['jawoidResource', function(Resource) {
    this.droids = [];
    this.errors = [];
    var originalDroid = {};
    var remote = new Resource(this.droids, this.errors, baseUrl + '/api/droids', {errMessages: {getAll: 'custom error message'}});
    this.getAll = remote.getAll.bind(remote);
    this.createDroid = function() {
      remote.save(this.newDroid)
        .then(() => {
          this.newDroid = null;
        });
    }.bind(this);
    this.updateDroid = function(droid) {
      remote.update(droid)
        .then(() => {
          droid.editing = false;
        });
    };
    this.removeDroid = remote.remove.bind(remote);

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
