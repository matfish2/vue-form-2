'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {

  var dates = { input: _dates.input, span: _dates.span };
  var classes = '';

  if (this.isTimepicker) classes += ' VF-Field--Date__timepicker';
  classes += this.type == 'input' ? ' date__input' : ' date__span';

  return h(
    'div',
    { 'class': 'VF-Field--Date__date' + classes },
    [dates[this.type].apply(this, [h])]
  );
};

var _dates = require('./dates');