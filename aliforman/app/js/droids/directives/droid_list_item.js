module.exports = function(app) {
  app.directive('droidListItem', () => {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/droid_list_item.html',
      scope: {
        droid: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.delete = controller.removeDroid;
        scope.edit = controller.editDroid;
        scope.cancel = controller.editDroid;
      }
    };
  });
};
