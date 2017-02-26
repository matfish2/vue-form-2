'use strict';

module.exports = function () {

  var width = this.hideLabel ? 12 : 12 - this.opts.labelWidth;

  return this.opts.layout == 'form-horizontal' ? 'col-sm-' + width : '';
};