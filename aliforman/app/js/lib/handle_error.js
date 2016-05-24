module.exports = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};
