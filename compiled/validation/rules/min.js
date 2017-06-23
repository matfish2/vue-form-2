'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (that) {

  var val = that.getValue();

  var value = that.Rules.number || that.Rules.integer || _typeof(that.Rules.min) == 'object' ? // moment object
  val : val.length;

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return value >= that.Rules.min;
};