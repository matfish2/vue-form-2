'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var disabled = this.disabled ? 'disabled' : '';
  return h(
    'button',
    {
      attrs: { type: 'submit'
      },
      'class': "VF-Submit__button btn btn-primary pull-right " + disabled },
    [this.text]
  );
};