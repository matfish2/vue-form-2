'use strict';

var _updateValue = require('../methods/update-value');

var _updateValue2 = _interopRequireDefault(_updateValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    props: {
      placeholder: {
        type: String,
        required: false,
        default: ''
      },
      debounce: {
        type: Number,
        default: 300
      },
      lazy: {
        type: Boolean
      },
      minlength: Number,
      maxlength: Number,
      autocomplete: String
    },
    data: function data() {
      return {
        lastKeyStroke: new Date()
      };
    },
    methods: {
      setValue: function setValue(val) {
        this.curValue = val;
        this.dirty = true;
        document.getElementsByName(this.name)[0].value = val;
      },

      updateValue: _updateValue2.default
    }
  });
};