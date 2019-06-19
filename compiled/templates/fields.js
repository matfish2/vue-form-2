"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _input = require("./input");

var _input2 = _interopRequireDefault(_input);

var _file = require("./file");

var _file2 = _interopRequireDefault(_file);

var _select = require("./select");

var _select2 = _interopRequireDefault(_select);

var _textarea = require("./textarea");

var _textarea2 = _interopRequireDefault(_textarea);

var _date = require("./date");

var _date2 = _interopRequireDefault(_date);

var _checkbox = require("./checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _toggler = require("./toggler");

var _toggler2 = _interopRequireDefault(_toggler);

var _buttonsList = require("./buttons-list");

var _buttonsList2 = _interopRequireDefault(_buttonsList);

var _addressFinder = require("./address-finder");

var _addressFinder2 = _interopRequireDefault(_addressFinder);

var _pikaday = require("./pikaday");

var _pikaday2 = _interopRequireDefault(_pikaday);

var _loqate = require("./loqate");

var _loqate2 = _interopRequireDefault(_loqate);

var _datepicker = require("./datepicker");

var _datepicker2 = _interopRequireDefault(_datepicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  text: _input2.default,
  password: _input2.default,
  email: _input2.default,
  number: _input2.default,
  select: _select2.default,
  file: _file2.default,
  textarea: _textarea2.default,
  date: _date2.default,
  checkbox: _checkbox2.default,
  toggler: _toggler2.default,
  buttons: _buttonsList2.default,
  addressfinder: _addressFinder2.default,
  pikaday: _pikaday2.default,
  loqate: _loqate2.default,
  datepicker: _datepicker2.default
};