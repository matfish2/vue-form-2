'use strict';

var merge = require('merge');
var Input = require('./input');

module.exports = function () {
  return merge.recursive(Input(), {
    data: function data() {
      return {
        fieldType: 'text'
      };
    }
  });
};