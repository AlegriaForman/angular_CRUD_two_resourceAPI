describe('all the jawas', () => {
  it('it should create a jawa information', () => {
    browser.get('http://localhost:5000');
    element(by.model('jawasctrl.newJawa.name')).sendKeys('Taz');
    element(by.model('jawasctrl.newJawa.address')).sendKeys('Naboo');
    element(by.model('jawasctrl.newJawa.email')).sendKeys('taz@gmail.com');
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
