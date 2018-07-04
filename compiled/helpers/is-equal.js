'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (value1, value2) {

  if (['date', 'partialdate'].indexOf(this.fieldType) > -1 && !this.range) {
    value1 = stringifyDate(value1);
    value2 = stringifyDate(value2);
  }

  if (isPrimitive(value1) && isPrimitive(value2)) {
    value1 = value1 ? value1 : null;
    value2 = value2 ? value2 : null;
    return value1 == value2;
  }

  var what = Object.prototype.toString;

  if (what.call(value1) == '[object Array]') {
    // multiple list
    return arraysEqual(value1, value2);
  }

  if (value1 && value1.start && value2 && value2.start) {

    var value1start = value1.start.format ? value1.start.format('YYYY-MM-DD') : value1.start;
    var value1end = value1.end.format ? value1.end.format('YYYY-MM-DD') : value1.end;
    var value2start = value2.start.format ? value2.start.format('YYYY-MM-DD') : value2.start;
    var value2end = value2.end.format ? value2.end.format('YYYY-MM-DD') : value2.end;

    return value1start == value2start && value1end == value2end;
  }

  return false;
};

function arraysEqual(arr1, arr2) {

  var equal = true;

  if (arr1 && !arr2) return false;

  if (arr1.length != arr2.length) return false;

  arr1.forEach(function (item) {
    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) != 'object' && arr2.indexOf(item) == -1) equal = false;
  });

  return equal;
}

function isPrimitive(val) {
  return ['string', 'number', 'boolean'].indexOf(typeof val === 'undefined' ? 'undefined' : _typeof(val)) > -1 || val === null;
}

function stringifyDate(value) {

  if (!value) return value;

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.format) {
    return value.format('YYYY-MM-DD');
  }

  return value.split(' ')[0];
}