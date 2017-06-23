"use strict";

module.exports = function (field) {

  var val = field.getValue();
  var value = field.momentizeValue(val);

  return value.start.isValid() && value.end.isValid() && value.end >= value.start;
};