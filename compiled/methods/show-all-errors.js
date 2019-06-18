"use strict";

module.exports = function () {
  var errors = [];

  this.vferrors.forEach(function (error) {
    var field = this.getField(error.name);

    if (field) {
      if (field.vferrors.indexOf(error.rule) == -1) {
        field.vferrors.push(error.rule);
        field.hadErrors = true;
      }
      error.show = true;
      errors.push(error);
    }
  }.bind(this));

  this.vferrors = errors;
};