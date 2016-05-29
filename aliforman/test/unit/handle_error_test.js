var angular = require('angular');

describe('jawoidHandleError service', function() {
  var jawoidHandleError;
  beforeEach(angular.mock.module('demoApp'));

  it('should return a function', angular.mock.inject(function(jawoidHandleError) {
    expect(typeof jawoidHandleError).toBe('function');
  }));

  it('should add an error to the errors array', angular.mock.inject(function(jawoidHandleError) {
    var testArr = [];
    jawoidHandleError(testArr, 'Test error message.')();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('Test error message.');
  }));
});
