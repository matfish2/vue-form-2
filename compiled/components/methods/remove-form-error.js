"use strict";

module.exports = function (item) {
  var index;

  this.getForm().vferrors.forEach(function (error, i) {
    if (error.name == item.name && error.rule == item.rule) {
      index = i;
    }
  });

  if (index >= 0) this.getForm().vferrors.splice(index, 1);
};