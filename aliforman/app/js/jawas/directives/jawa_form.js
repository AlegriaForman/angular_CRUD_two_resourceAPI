module.exports = function(app) {
  app.directive('jawaForm', () => {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/jawa_form.html',
      scope: {
        jawa: '=',
        buttonText: '@',
        crud: '@'
      },
      link: function(scope, element, attrs, controller) {
        var cruds = {
          update: controller.updateJawa,
          create: controller.createJawa,
          cancel: controller.cancelJawa,
          edit: controller.editJawa
        };
        scope.save = cruds[scope.crud];
      }
    };
  });
};
