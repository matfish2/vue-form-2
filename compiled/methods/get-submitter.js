'use strict';

var _ajax = require('./submitters/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _client = require('./submitters/client');

var _client2 = _interopRequireDefault(_client);

var _server = require('./submitters/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (vm) {

  if (vm.ajax) return (0, _ajax2.default)(vm);
  if (vm.client) return (0, _client2.default)(vm);

  return (0, _server2.default)(vm);
};