'use strict';

var isNumeric = require('../../helpers/is-numeric');

module.exports = function (that) {

  var value = that.getValue();

  return !!(value && (isString(value) || that.fieldType == 'checkbox' || that.fieldType == 'date' || that.fieldType == 'partialdate' || isMultipleList(that, value) || isNumeric(value)));
};

function isMultipleList(that, value) {
  return (that.fieldType == 'select' || that.fieldType == 'buttons') && that.multiple && value.length > 0;
}

function isString(value) {
  return typeof value == 'string' && value.trim().length > 0;
}