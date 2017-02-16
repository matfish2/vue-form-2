'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  var options = _merge2.default.recursive((0, _options2.default)(), this.globalOptions);

  return _merge2.default.recursive(options, this.options);
};

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _options = require('../options/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }