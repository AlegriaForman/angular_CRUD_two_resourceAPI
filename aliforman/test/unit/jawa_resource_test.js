const angular = require('angular');
var $httpBackend;

describe('it should test the service', function() {

  beforeEach(angular.mock.module('demoApp'));
  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all the resources', angular.mock.inject(function(jawoidResource) {
    var resourceArray = [];
    var errorsArray = [];
    var resource = new jawoidResource(resourceArray, errorsArray, 'http://localhost:3000/api/jawas');

    $httpBackend.expectGET('http://localhost:3000/api/jawas').respond(200, [{ name: 'Miko' }]);
    resource.getAll();
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(errorsArray.length).toBe(0);
    expect(resourceArray[0].name).toBe('Miko');
  }));

  it('should return a function', angular.mock.inject(function(jawoidResource) {
    expect(typeof jawoidResource).toBe('function');
  }));

  it('should create a resource', angular.mock.inject(function(jawoidResource, $httpBackend) {
    var resourceArray = [];
    var errorsArray = [];
    var resource = new jawoidResource(resourceArray, errorsArray, 'http://localhost:3000/api/jawas');

    $httpBackend.expectPOST('http://localhost:3000/api/jawas', { name: 'Kai1' }).respond(200, { name: 'Kai2', _id: 0 });
    resource.save({ name: 'Kai1' });
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(errorsArray.length).toBe(0);
    expect(resourceArray[0].name).toBe('Kai2');
  }));

  it('should have update the resource', angular.mock.inject(function(jawoidResource, $q) {
    var resourceArray = [{ name: 'Kai3', _id: 1 }];
    var errorsArray = [];
    var resource = new jawoidResource(resourceArray, errorsArray, 'http://localhost:3000/api/jawas');

    $httpBackend.expectPUT('http://localhost:3000/api/jawas/1', {name: 'Kai3', _id: 1}).respond(200);
    resource.update({ name: 'Kai3', _id: 1 });
    $httpBackend.flush();
    expect(errorsArray.length).toBe(0);
    expect(resourceArray[0].name).toBe('Kai3');
  }));

 it('should remove the resource', angular.mock.inject(function(jawoidResource, $httpBackend) {
    $httpBackend.expectDELETE('http://localhost:3000/api/jawas/1').respond(200);
    var resourceArray = [{ name: 'Kai3', _id: 1 }];
    var errorsArray = [];
    var resource = new jawoidResource(resourceArray, errorsArray, 'http://localhost:3000/api/jawas');
    resource.remove(resourceArray[0]);
    $httpBackend.flush();
    expect(errorsArray.length).toBe(0);
    expect(resourceArray.length).toBe(0);
  }));
});
