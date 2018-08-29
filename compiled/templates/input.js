'use strict';

Object.defineProperty(exports, "__esModule", {
       value: true
});

exports.default = function (h) {
       var _this = this;

       return h('input', {
              attrs: { type: this.fieldType,
                     name: this.Name,

                     placeholder: this.placeholder,
                     disabled: this.disabled,
                     minlength: this.minlength,
                     maxlength: this.maxlength,
                     autocomplete: this.autocomplete
              },
              domProps: {
                     'value': this.value
              },
              on: {
                     'input': function input(e) {
                            return _this.$emit('input', e.target.value);
                     }
              },

              'class': 'form-control' });
};

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }