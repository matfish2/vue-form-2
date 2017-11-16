"use strict";

Object.defineProperty(exports, "__esModule", {
       value: true
});

exports.default = function (h) {

       return h(
              "input",
              {
                     attrs: { type: this.fieldType,
                            name: this.name,

                            placeholder: this.placeholder,
                            disabled: this.disabled,
                            minlength: this.minlength,
                            maxlength: this.maxlength,
                            autocomplete: this.autocomplete
                     },
                     domProps: {
                            "value": this.curValue
                     },
                     on: {
                            "change": this.updateValue.bind(this),
                            "keyup": (0, _debounce2.default)(this.updateValue, this.debounce)
                     },

                     "class": "form-control" },
              []
       );
};

var _debounce = require("debounce");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }