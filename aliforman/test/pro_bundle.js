/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = exports = {
	  config: {
	    seleniumAddress: 'http://localhost:4444/wd/hub',
	    specs: ['droid_spec.js', 'jawa_spec.js']
	  }
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	describe('all the droids', () => {
	  it('it should create a droid information', () => {
	    browser.get('http://localhost:5000');
	    element(by.model('droidsctrl.name')).sendKeys('R2D2');
	    element(by.model('droidsctrl.address')).sendKeys('Imperial Planet');
	    element(by.model('droidsctrl.email')).sendKeys('r2d2@yahoo.com');
	    element(by.id('newdroid')).click();
	    var elName = element(by.repeater('droid in droidsctrl.droids').row(0).column('name'));
	
	    elName.getText().then((text) => {
	      expect(text).toEqual('R2D2 | Imperial Planet | r2d2@yahoo.com');
	    });
	  });
	
	  it('it should update droid information', () => {
	    browser.get('http://localhost:5000');
	    var droidName = element(by.repeater('droid in droidsctrl.droids').row(0));
	    var editDroidButton = droidName.element(by.buttonText('Edit'));
	    editDroidButton.click();
	
	    element(by.model('droid.name')).clear().sendKeys('R2D3');
	    element(by.model('droid.address')).clear().sendKeys('Outer Rim Planet');
	    element(by.model('droid.email')).clear().sendKeys('r2d3@yahoo.com');
	
	    var droidUpdateButton = droidName.element(by.buttonText('Update'));
	    droidUpdateButton.click();
	
	    var droidEl = element(by.repeater('droid in droidsctrl.droids').row(0).column('name'));
	    droidEl.getText().then((text) => {
	      expect(text).toEqual('R2D3 | Outer Rim Planet | r2d3@yahoo.com');
	    });
	  });
	
	  it('it should cancel droid information', () => {
	    browser.get('http://localhost:5000');
	    var jawaName = element(by.repeater('droid in droidsctrl.droids').row(0));
	    var editJawaButton = jawaName.element(by.buttonText('Edit'));
	    editJawaButton.click();
	
	    element(by.model('droid.name')).clear().sendKeys('R2D2');
	    element(by.model('droid.address')).clear().sendKeys('Outer Rim');
	    element(by.model('droid.email')).clear().sendKeys('r2d2@yahoo.com');
	
	    var cancelButton = jawaName.element(by.buttonText('Cancel'));
	    cancelButton.click();
	
	    var jawaEl = element(by.repeater('droid in droidsctrl.droids').row(0).column('name'));
	    jawaEl.getText().then((text) => {
	      expect(text).toEqual('R2D3 | Outer Rim Planet | r2d3@yahoo.com');
	    });
	  });
	
	  it('it should delete droid information', () => {
	    browser.get('http://localhost:5000');
	    var jawaName = element(by.repeater('droid in droidsctrl.droids').row(0));
	    var deleteJawaButton = jawaName.element(by.buttonText('Delete Droid Info'));
	    deleteJawaButton.click();
	    jawaName = element(by.repeater('droid in droidsctrl.droids').row(0));
	    expect(jawaName.isPresent()).toBe(false);
	  });
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	describe('all the jawas', () => {
	  it('it should create a jawa information', () => {
	    browser.get('http://localhost:5000');
	    element(by.model('jawasctrl.name')).sendKeys('Taz');
	    element(by.model('jawasctrl.address')).sendKeys('Naboo');
	    element(by.model('jawasctrl.email')).sendKeys('taz@gmail.com');
	    element(by.id('newjawa')).click();
	    var elName = element(by.repeater('jawa in jawasctrl.jawas').row(0).column('name'));
	
	    elName.getText().then((text) => {
	      expect(text).toEqual('Taz | Naboo | taz@gmail.com');
	    });
	  });
	
	  it('it should update jawa information', () => {
	    browser.get('http://localhost:5000');
	    var jawaName = element(by.repeater('jawa in jawasctrl.jawas').row(0));
	    var editJawaButton = jawaName.element(by.buttonText('Edit'));
	    editJawaButton.click();
	
	    element(by.model('jawa.name')).clear().sendKeys('R2D3');
	    element(by.model('jawa.address')).clear().sendKeys('Outer Rim Planet');
	    element(by.model('jawa.email')).clear().sendKeys('r2d3@yahoo.com');
	
	    var jawaUpdateButton = jawaName.element(by.buttonText('Update'));
	    jawaUpdateButton.click();
	
	    var jawaEl = element(by.repeater('jawa in jawasctrl.jawas').row(0).column('name'));
	    jawaEl.getText().then((text) => {
	      expect(text).toEqual('R2D3 | Outer Rim Planet | r2d3@yahoo.com');
	    });
	  });
	
	  it('it should cancel jawa information', () => {
	    browser.get('http://localhost:5000');
	    var jawaName = element(by.repeater('jawa in jawasctrl.jawas').row(0));
	    var editJawaButton = jawaName.element(by.buttonText('Edit'));
	    editJawaButton.click();
	
	    element(by.model('jawa.name')).clear().sendKeys('R2D2');
	    element(by.model('jawa.address')).clear().sendKeys('Outer Rim');
	    element(by.model('jawa.email')).clear().sendKeys('r2d2@yahoo.com');
	
	    var cancelButton = jawaName.element(by.buttonText('Cancel'));
	    cancelButton.click();
	
	    var jawaEl = element(by.repeater('jawa in jawasctrl.jawas').row(0).column('name'));
	    jawaEl.getText().then((text) => {
	      expect(text).toEqual('R2D3 | Outer Rim Planet | r2d3@yahoo.com');
	    });
	  });
	
	  it('it should delete jawa information', () => {
	    browser.get('http://localhost:5000');
	    var jawaName = element(by.repeater('jawa in jawasctrl.jawas').row(0));
	    var deleteJawaButton = jawaName.element(by.buttonText('Delete Jawa Info'));
	    deleteJawaButton.click();
	    jawaName = element(by.repeater('jawa in jawasctrl.jawas').row(0));
	    expect(jawaName.isPresent()).toBe(false);
	  });
	});


/***/ }
/******/ ]);
//# sourceMappingURL=pro_bundle.js.map