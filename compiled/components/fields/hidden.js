'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    render: function render(h) {
      return h('input', {
        attrs: { type: 'hidden', name: this.Name },
        domProps: {
          'value': this.value
        }
      });
    }
  });
};