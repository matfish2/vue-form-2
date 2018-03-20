'use strict';

var hasValue = require('./has-value');

module.exports = function (that) {

  if (!that.Rules.required || that.isHidden()) {
    return true;
  }

  return hasValue(that);
};