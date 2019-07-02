"use strict";

module.exports = function (that) {
  var val = that.value;

  var value = ["email", "password", "text", "textarea"].indexOf(that.fieldType) > -1 ? val.length : Number(val);

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return value === that.Rules.exactly;
};