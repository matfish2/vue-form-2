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
                            value: this.curValue,

                            placeholder: this.placeholder,
                            disabled: this.disabled,
                            minlength: this.minlength,
                            maxlength: this.maxlength,
                            autocomplete: this.autocomplete
                     },
                     on: {
                            "change": this.updateValue.bind(this),
                            "keyup": this.updateValue.bind(this)
                     },

                     "class": "form-control" },
              []
       );
};