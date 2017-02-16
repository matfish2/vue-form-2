'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _merge2.default.recursive((0, _input2.default)(), {
    data: function data() {
      return {
        fieldType: 'password'
      };
    }
  });
};

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }