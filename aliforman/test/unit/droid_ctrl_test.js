var angular = require('angular');
require('angular-mocks');

describe('droids controller', () => {
  var $controller;

  beforeEach(angular.mock.module('demoApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a droid controller', () => {
    var droidsctrl = $controller('DroidsController');
    expect(typeof droidsctrl).toBe('object');
    expect(typeof droidsctrl.getAll).toBe('function');
  });

  describe('REST functionality', () => {
    var $httpBackend;
    var droidsctrl;
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      droidsctrl = $controller('DroidsController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET droids', () => {
      $httpBackend.expectGET('http://localhost:3000/api/droids').respond(200, [{ name: 'X7G0' }]);
      droidsctrl.getAll();
      $httpBackend.flush();
      expect(droidsctrl.droids.length).toBe(1);
      expect(droidsctrl.droids[0].name).toBe('X7G0');
    });

    it('should create droid info', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/droids', { name: 'F34H' }).respond(200, { name: 'B0A1' }); // eslint-disable-line
      expect(droidsctrl.droids.length).toBe(0);
      droidsctrl.newDroid = { name: 'F34H' };
      droidsctrl.createDroid();
      $httpBackend.flush();
      expect(droidsctrl.droids[0].name).toBe('B0A1');
      expect(droidsctrl.newDroid).toBe(null);
    });

    it('should update droid', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/droids/1', { name: 'X7G0Z', editing: true, _id: 1 }).respond(200); // eslint-disable-line

      droidsctrl.droids = [ { name: 'X7G0', editing: true, _id: 1 } ];
      droidsctrl.droids[0].name = 'X7G0Z';
      droidsctrl.updateDroid(droidsctrl.droids[0]);
      $httpBackend.flush();
      expect(droidsctrl.droids[0].editing).toBe(false);
    });

    it('should delete droid info', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/droids/1').respond(200);
      droidsctrl.droids = [{ name: 'F34H', _id: 1 }];
      droidsctrl.removeDroid(droidsctrl.droids[0]);
      $httpBackend.flush();
      expect(droidsctrl.droids.length).toBe(0);
    });
  });
});
