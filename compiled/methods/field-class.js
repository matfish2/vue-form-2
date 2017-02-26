'use strict';

module.exports = function (hasLabel) {

  var width = hasLabel ? 12 - this.opts.labelWidth : 12;

  return this.opts.layout == 'form-horizontal' ? 'col-sm-' + width : '';
};