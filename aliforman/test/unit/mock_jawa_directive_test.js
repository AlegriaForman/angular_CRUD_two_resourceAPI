require('../../app/js/entry');
const angular = require('angular');
require('angular-mocks');

describe('it should test the controller', () => {
  var JawasController;
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
    var jawasctrl;
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      jawasctrl = $controller('JawasController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET jawas', () => {
      $httpBackend.expectGET('http://localhost:3000/api/jawas').respond(200, [{ name: 'Firo' }]);
      jawasctrl.getAll();
      $httpBackend.flush();
      expect(jawasctrl.jawas.length).toBe(1);
      expect(jawasctrl.jawas[0].name).toBe('Firo');
    });

    it('should create jawa info', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/jawas', { name: 'Dume' }).respond(200, { name: 'Dume IV' }); // eslint-disable-line
      expect(jawasctrl.jawas.length).toBe(0);
      jawasctrl.newJawa = { name: 'Dume' };
      jawasctrl.createJawa();
      $httpBackend.flush();
      expect(jawasctrl.jawas[0].name).toBe('Dume IV');
      expect(jawasctrl.newJawa).toBe(null);
    });

    it('should update jawa', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/jawas/1', { name: 'Firo II', editing: true, _id: 1 }).respond(200); // eslint-disable-line

      jawasctrl.jawas = [{ name: 'Firo', editing: true, _id: 1 }];
      jawasctrl.jawas[0].name = 'Firo II';
      jawasctrl.updateJawa(jawasctrl.jawas[0]);
      $httpBackend.flush();
      expect(jawasctrl.jawas[0].editing).toBe(false);
      expect(jawasctrl.jawas.length).toBe(1);
    });

    it('should delete jawa info', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/jawas/1').respond(200);
      jawasctrl.jawas = [{ name: 'Firo', _id: 1 }];
      jawasctrl.removeJawa(jawasctrl.jawas[0]);
      $httpBackend.flush();
      expect(jawasctrl.jawas.length).toBe(0);
    });
  });
});
