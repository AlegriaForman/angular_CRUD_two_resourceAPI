module.exports = function(app) {
  app.factory('counterService', ['$rootScope', function() {
    return {
      count: 0,
      addCount: function() {
        this.count++;
      },
      minusCount: function() {
        this.count--;
      },
      getCount: function() {
        return this.count;
      }
    };
  }]);
};
