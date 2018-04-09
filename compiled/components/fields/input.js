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
        var setDirty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        this.saveValue(val);
        if (setDirty) this.dirty = true;
        document.getElementsByName(this.Name)[0].value = val;
      },
      reset: function reset() {
        this.saveValue('');
        this.wasReset = true;
        document.getElementsByName(this.Name)[0].value = '';
      },

      updateValue: _updateValue2.default
    }
  });
};