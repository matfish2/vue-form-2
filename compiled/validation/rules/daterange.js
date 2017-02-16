"use strict";

module.exports = function (field) {

  var value = field.momentizeValue(field.curValue);

  return value.start.isValid() && value.end.isValid() && value.end >= value.start;
};