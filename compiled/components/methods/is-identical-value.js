'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (newValue, oldValue) {

  if (typeof oldValue === 'undefined' && !newValue) {
    return true;
  }

  if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) !== 'object') {
    return oldValue === newValue;
  }

  if (oldValue === null && newValue !== null || oldValue === null && newValue !== null) {
    return false;
  }

  if (Object.prototype.toString.call(newValue) === '[object Array]') {
    return newValue.length === oldValue.length && newValue.every(function (v, i) {
      return v === oldValue[i];
    });
  }

  return false;
};