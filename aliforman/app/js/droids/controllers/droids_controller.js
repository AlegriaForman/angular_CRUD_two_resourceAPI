const angular = require('angular'); // eslint-disable-line
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('DroidsController', ['$rootScope', 'jawoidResource', 'counterService',
    function($rs, Resource, counterService) {
      this.droids = [];
      this.errors = [];
      var originalDroid = {};
      var remote = new Resource(this.droids, this.errors, baseUrl + '/api/droids',
        { errMess: { getAll: 'custom error message' } });
      this.getAll = remote.getAll.bind(remote);
      this.createDroid = function() {
        remote.save(this.newDroid)
          .then(() => {
            this.newDroid = null;
          });
      }.bind(this, counterService);
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
      this.counter = counterService;
      this.getCount = counterService.getCount.bind(counterService);
      this.add = counterService.addCount.bind(counterService);
      this.minus = counterService.minusCount.bind(counterService);
    }]);
};
