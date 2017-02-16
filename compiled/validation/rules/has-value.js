'use strict';

var isNumeric = require('../../helpers/is-numeric');

module.exports = function (that) {

  return !!(that.curValue && (isString(that.curValue) || that.fieldType == 'checkbox' || that.fieldType == 'date' || isMultipleList(that) || isNumeric(that.curValue)));
};

function isMultipleList(that) {
  return (that.fieldType == 'select' || that.fieldType == 'buttons') && that.multiple && that.curValue.length > 0;
}

function isString(value) {
  return typeof value == 'string' && value.trim().length > 0;
}