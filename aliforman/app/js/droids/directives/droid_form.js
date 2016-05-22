module.exports = function(app) {
  app.directive('droidForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/droid_form.html',
      scope: {
        droid: '=',
        buttonText: '@',
        crud: '@'
      },
      link: function(scope, element, attrs, controller) {
        var cruds = {
          update: controller.updateDroid,
          create: controller.createDroid,
          cancel: controller.cancelDroid,
          edit: controller.editDroid
        };
        scope.save = cruds[scope.crud];
      }
    };
  });
};
