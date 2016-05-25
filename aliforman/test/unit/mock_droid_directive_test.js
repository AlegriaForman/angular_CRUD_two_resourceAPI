require('../../app/js/entry');
const angular = require('angular');
require('angular-mocks');

describe('it should test the controller', () => {
  var DroidsController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });

  beforeEach(angular.mock.module('demoApp'));
  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a droid controller', () => {
    var droidsctrl = $controller('DroidsController');
    expect(typeof droidsctrl).toBe('object');
    expect(typeof droidsctrl.getAll).toBe('function');
  });

  describe('CRUD tests', () => {
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
      $httpBackend.expectGET('http://localhost:3000/api/droids').respond(200, [{ name: 'Firo' }]);
      droidsctrl.getAll();
      $httpBackend.flush();
      expect(droidsctrl.droids.length).toBe(1);
      expect(droidsctrl.droids[0].name).toBe('Firo');
    });

    it('should create jawa info', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/droids', { name: 'Dume' }).respond(200, { name: 'Dume IV' }); // eslint-disable-line
      expect(droidsctrl.droids.length).toBe(0);
      droidsctrl.newDroid = { name: 'Dume' };
      droidsctrl.createDroid();
      $httpBackend.flush();
      expect(droidsctrl.droids[0].name).toBe('Dume IV');
      expect(droidsctrl.newDroid).toBe(null);
    });

    it('should update jawa', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/droids/1', { name: 'Firo II', editing: true, _id: 1 }).respond(200); // eslint-disable-line

      droidsctrl.droids = [{ name: 'Firo', editing: true, _id: 1 }];
      droidsctrl.droids[0].name = 'Firo II';
      droidsctrl.updateDroid(droidsctrl.droids[0]);
      $httpBackend.flush();
      expect(droidsctrl.droids[0].editing).toBe(false);
      expect(droidsctrl.droids.length).toBe(1);
    });

    it('should delete jawa info', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/droids/1').respond(200);
      droidsctrl.droids = [{ name: 'Firo', _id: 1 }];
      droidsctrl.removeDroid(droidsctrl.droids[0]);
      $httpBackend.flush();
      expect(droidsctrl.droids.length).toBe(0);
    });
  });
});
