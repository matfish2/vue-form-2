"use strict";

module.exports = function (field) {

  var val = field.value;
  var value = field.momentizeValue(val);

  return value.start.isValid() && value.end.isValid() && value.end >= value.start;
};