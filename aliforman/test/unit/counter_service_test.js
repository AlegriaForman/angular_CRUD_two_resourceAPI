var angular = require('angular');

describe('Test add counter service', () => {
  var $httpBackend;
  var counterService;
  
  beforeEach(angular.mock.module('demoApp'));

  it('should return an object', angular.mock.inject(function(counterService){
    expect(typeof counterService).toBe('object');
  }));

  it('should have a counter', angular.mock.inject(function(counterService){
    expect(typeof counterService.count).toBe('number');
  }));

  it('should have a method to add and minus one', angular.mock.inject(function(counterService){
    expect(typeof counterService.addCount).toBe('function');

    expect(counterService.count).toBe(0);
    counterService.addCount();
    expect(counterService.count).toBe(1);
    counterService.minusCount();
    expect(counterService.count).toBe(0);
  }));
});