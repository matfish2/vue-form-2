'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (that) {

  if (!that.curValue) return true;

  var otherField = that.getField(that.Rules.smallerThan);

  if (!otherField || !otherField.curValue) return true;

  var value1 = !!isNaN(that.curValue) || _typeof(that.curValue) == 'object' ? that.curValue : parseFloat(that.curValue);
  var value2 = !!isNaN(otherField.curValue) || _typeof(otherField.curValue) == 'object' ? otherField.curValue : parseFloat(otherField.curValue);

  return value1 < value2;
};