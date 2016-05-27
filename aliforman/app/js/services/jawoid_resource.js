module.exports = function(app) {
  app.factory('jawoidResource', ['$http', 'jawoidHandleError', function($http, jawoidError) {
    var Resource = function(resourceArr, errorsArr, baseUrl, options) {
      this.data = resourceArr;
      this.url = baseUrl;
      this.errors = errorsArr;
      this.options = options || {};
      this.options.errMessages = this.options.errMessages || {};
    };

    Resource.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.splice(0);
          for(var i = 0; i < res.data.length; i++)
            this.data.push(res.data[i]);
        }, jawoidError(this.errors, this.options.errMessages.getAll ||'Could not GET resource.'));
    };

    Resource.prototype.save = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, jawoidError(this.errors, this.options.errMessages.save || 'Could not SAVE resource.'));
    };

    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
        .catch(jawoidError(this.errors, this.options.errMessages.update ||'Could not UPDATE resource.'));
    };

    Resource.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
        .then(() => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, jawoidError(this.errors, this.options.errMessages.remove || 'Could not REMOVE the resource.'));
    };

    // Resource.prototype.update = function(resource) {
    //   return $http.put(this.url + '/' + resource._id, resource)
    //     .catch(jawoidError(this.errors, this.options.errMessages.update ||'Could not UPDATE resource.'));
    // };

    // Resource.prototype.remove = function(resource) {
    //   return $http.delete(this.url + '/' + resource._id)
    //     .then(() => {
    //       this.data.splice(this.data.indexOf(resource), 1);
    //     }, jawoidError(this.errors, this.options.errMessages.remove || 'Could not REMOVE the resource.'));
    // };
    return Resource;
  }]);
};



// var jawoidFulfill = function(callback) {
//   return function(res) {
//     callback(null,res.data);
//   };
// };

// var jawoidReject = function(callback) {
//   return function(res) {
//     callback(res);
//   };
// };

// module.exports = function(app) {
//   app.factory('jawoidResource', ['$http', 'jawoidHandleError', function($http, cfError) {
//     var Resource = function(resourceName, errorsArr, baseUrl, options) {
//       this.resourceName = resourceName;
//       this.url = baseUrl;
//       this.errors = errorsArr;
//       this.options = options || {};
//       this.options.errMessages = this.options.errMessages || {};
//     };

//     Resource.prototype.getAll = function(callback){
//       $http.get('http://localhost:3000/api' + this.resourceName)
//         .then((res) => {
//           this.data.splice(0);
//           for(var i = 0; i < res.data.length; i++)
//             this.data.push(res.data[i]);
//         }, jawoidFulfill(callback), jawoidReject(callback));
//     };

//     Resource.prototype.create = function(data,callback) {
//       $http.post('http://localhost:3000/api' + this.resourceName, data)
//        .then(jawoidFulfill(callback), jawoidReject(callback));
//     };

//     Resource.prototype.update = function(data, callback) {
//       $http.put('http://localhost:3000/api' + this.resourceName + '/' + data._id, data)
//         .then(jawoidFulfill(callback), jawoidReject(callback));
//     };

//     Resource.prototype.remove = function(data, callback) {
//       $http.remove('http://localhost:3000/api' + this.resourceName + '/' + data._id)
//         .then(jawoidFulfill(callback), jawoidReject(callback));
//     };
//     // Resource.prototype.cancel = function(data, callback) {
//     //   droid.editing = false;
//     //   droid.name = originalDroid.name;
//     //   droid.address = originalDroid.address;
//     //   droid.email = originalDroid.email;
//     // };
//     // Resource.prototype.edit = function(data, callback) {
//     //   droid.editing = true;
//     //   originalDroid.name = droid.name;
//     //   originalDroid.address = droid.address;
//     //   originalDroid.email = droid.email;
//     // };
//     return function(resourceName) {
//       return new Resource(resourceName);
//     };
//   }]);
// }
