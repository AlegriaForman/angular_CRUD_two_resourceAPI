const fs = require('fs');

function findSeleniumJar() {
  var seleniumPath = __dirname +
    '/../../node_modules/gulp-protractor/node_modules/protractor/selenium/';
  var seleniumFiles = fs.readdirSync(seleniumPath);
  var seleniumJar;

  for (var i = seleniumFiles.length - 1; i >= 0; i--) {
    if (seleniumFiles[i].endsWith('.jar')) {
      seleniumJar = seleniumPath + seleniumFiles[i];
      return seleniumJar;
    }
  }
}

module.exports = exports = {
  config: {
    seleniumServerJar: findSeleniumJar()
  }
};
