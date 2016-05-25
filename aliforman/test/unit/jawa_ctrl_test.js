var angular = require('angular');
require('angular-mocks');

describe('jawas controller', () => {
  var $controller;

  beforeEach(angular.mock.module('demoApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a jawa controller', () => {
    var jawasctrl = $controller('JawasController');
    expect(typeof jawasctrl).toBe('object');
    expect(typeof jawasctrl.getAll).toBe('function');
  });

  describe('REST functionality', () => {
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
      $httpBackend.expectGET('http://localhost:3000/api/jawas').respond(200, [{ name: 'Jax' }]);
      jawasctrl.getAll();
      $httpBackend.flush();
      expect(jawasctrl.jawas.length).toBe(1);
      expect(jawasctrl.jawas[0].name).toBe('Jax');
    });

    it('should create jawa info', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/jawas', { name: 'Kuru1' }).respond(200, { name: 'Kuru2' }); // eslint-disable-line
      expect(jawasctrl.jawas.length).toBe(0);
      jawasctrl.newJawa = { name: 'Kuru1' };
      jawasctrl.createJawa();
      $httpBackend.flush();
      expect(jawasctrl.jawas[0].name).toBe('Kuru2');
      expect(jawasctrl.newJawa).toBe(null);
    });

    it('should update jawa', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/jawas/1', { name: 'Kuru Changed', editing: true, _id: 1 }).respond(200); // eslint-disable-line

      jawasctrl.jawas = [{ name: 'Jax', editing: true, _id: 1 }];
      jawasctrl.jawas[0].name = 'Kuru Changed';
      jawasctrl.updateJawa(jawasctrl.jawas[0]);
      $httpBackend.flush();
      expect(jawasctrl.jawas[0].editing).toBe(false);
    });

    it('should delete jawa info', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/jawas/1').respond(200);
      jawasctrl.jawas = [{ name: 'Kuru', _id: 1 }];
      jawasctrl.removeJawa(jawasctrl.jawas[0]);
      $httpBackend.flush();
      expect(jawasctrl.jawas.length).toBe(0);
    });
  });
});
