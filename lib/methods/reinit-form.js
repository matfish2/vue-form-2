var clone = require("clone");

module.exports = function() {
  this.vffields.forEach(function(field) {
    field.initialValue = clone(field.value);
  });
};
