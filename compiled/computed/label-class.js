'use strict';

module.exports = function () {

  return this.opts.layout == 'form-horizontal' ? 'col-sm-' + this.opts.labelWidth : '';
};