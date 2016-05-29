var angular = require('angular');

describe('Test add counter service', () => {
  beforeEach(angular.mock.module('demoApp'));

  var $httpBackend;
  var counterService;

  beforeEach(angular.mock.inject(function(_$httpBackend_, counterService) {
    $httpBackend = _$httpBackend_;
    counter = counterService.addCount;
  }));

  it('should be a service', () => {
    expect(typeof counter).toBe('function');
  });
});
