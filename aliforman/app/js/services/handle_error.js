module.exports = function(app) {
  app.factory('jawoidHandleError', () => {
    return function(errorsArr, message) {
      return function(err) {
        console.log(err);
        if (Array.isArray(errorsArr)) // eslint-disable-line
          errorsArr.push(new Error(message || 'Server error, please try again.'));
      };
    };
  });
};
