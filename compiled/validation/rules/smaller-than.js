'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (that) {

  var val = that.value;

  if (!val) return true;

  var otherField = that.getField(that.Rules.smallerThan);

  if (!otherField || !otherField.value) return true;

  var otherFieldValue = otherField.value;

  var value1 = !!isNaN(val) || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) == 'object' ? val : parseFloat(val);
  var value2 = !!isNaN(otherFieldValue) || (typeof otherFieldValue === 'undefined' ? 'undefined' : _typeof(otherFieldValue)) == 'object' ? otherFieldValue : parseFloat(otherFieldValue);

  return value1 < value2;
};