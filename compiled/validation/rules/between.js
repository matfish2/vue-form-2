'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (that) {

  var value = that.Rules.number || that.Rules.integer || _typeof(that.Rules.between[0]) == 'object' ? // moment objects
  that.curValue : that.curValue.length;

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return value >= that.Rules.between[0] && value <= that.Rules.between[1];
};