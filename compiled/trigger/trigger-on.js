'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (that, trigger, values) {

  if (!trigger) return true;

  var triggerValue = trigger.value;

  if (!values) return !!triggerValue;

  if (triggerValue == null) return false;

  values = values.split(",");

  var value = (typeof triggerValue === 'undefined' ? 'undefined' : _typeof(triggerValue)) == 'object' ? triggerValue : [triggerValue];
  return !!values.filter(function (n) {
    value = '' + value;
    return value.indexOf(n) != -1;
  }).length;
};