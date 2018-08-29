'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    methods: {},
    data: function data() {
      return {
        fieldType: 'checkbox'
      };
    }
  });
};