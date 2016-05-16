describe('all the droids', () => {
  it('it should create a droid information', () => {
    browser.get('http://localhost:5000');
    element(by.model('droidsctrl.newDroid.name')).sendKeys('R2D2');
    element(by.model('droidsctrl.newDroid.address')).sendKeys('Imperial Planet');
    element(by.model('droidsctrl.newDroid.email')).sendKeys('r2d2@yahoo.com');
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
