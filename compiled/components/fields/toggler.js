'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    props: {
      value: {
        default: false
      }
    },
    data: function data() {
      return {
        fieldType: 'toggler'
      };
    }
  });
};