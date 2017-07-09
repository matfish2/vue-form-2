'use strict';

module.exports = function (that) {

  var val = that.getValue();

  var value = ['text', 'textarea'].indexOf(that.fieldType) > -1 ? val.length : val;

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return value >= that.Rules.min;
};