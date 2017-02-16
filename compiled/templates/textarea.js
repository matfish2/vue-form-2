"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

exports.default = function (h) {
        return h(
                "textarea",
                {
                        attrs: {
                                name: this.name,
                                id: "textarea_" + this.name,

                                disabled: this.disabled,
                                placeholder: this.placeholder },
                        "class": "form-control",
                        on: {
                                "change": this.updateValue.bind(this),
                                "keyup": this.updateValue.bind(this)
                        }
                },
                [this.curValue]
        );
};