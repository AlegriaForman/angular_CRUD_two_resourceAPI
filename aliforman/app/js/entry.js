const angular = require('angular');
const demoApp = angular.module('demoApp', []);

require('./services')(demoApp);
require('./jawas')(demoApp);
require('./droids')(demoApp);
require('./accordion')(demoApp);
