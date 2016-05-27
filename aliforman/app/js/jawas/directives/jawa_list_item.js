module.exports = function(app) {
  app.directive('jawaListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/jawa_list_item.html',
      scope: {
        jawa: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.delete = controller.removeJawa;
        scope.edit = controller.editJawa;
        scope.cancel = controller.editJawa;

      }
    };
  });
};
