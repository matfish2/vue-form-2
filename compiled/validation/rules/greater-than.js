'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (that) {

  var value = that.value;

  if (!value) return true;

  var otherField = that.getField(that.Rules.greaterThan);

  if (!otherField || !otherField.value) return true;

  var otherFieldValue = otherField.value;

  var value1 = !!isNaN(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' ? value : parseFloat(value);
  var value2 = !!isNaN(otherFieldValue) || (typeof otherFieldValue === 'undefined' ? 'undefined' : _typeof(otherFieldValue)) == 'object' ? otherFieldValue : parseFloat(otherFieldValue);

  return value1 > value2;
};