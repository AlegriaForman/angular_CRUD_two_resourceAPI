const angular = require('angular');
const demoApp = angular.module('demoApp', []);

require('./jawas')(demoApp);
require('./droids')(demoApp);
