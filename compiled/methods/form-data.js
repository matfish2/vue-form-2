'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var merge = require('merge');

module.exports = function () {
  var data = {};
  var value;

  this.fields.forEach(function (field) {
    value = getValue(field.curValue);
    data[field.name] = value;
  });

  data = merge.recursive(data, this.getOptions().additionalPayload);

  return data;
};

function isValidMomentObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value.isValid && value.isValid();
}

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

function getValue(value) {

  if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) != 'object' || isArray(value)) return value;

  if (isValidMomentObject(value)) return value.format();

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value.start && isValidMomentObject(value.start) && value.end && isValidMomentObject(value.end)) {
    return {
      start: value.start.format(),
      end: value.end.format()
    };
  }
}