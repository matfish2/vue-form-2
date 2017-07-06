"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

exports.default = function (h) {

      var button = this.toggler ? h(
            "button",
            {
                  attrs: { type: "button" },
                  "class": "btn btn-default btn-xs", on: {
                        "click": this.toggle.bind(this)
                  }
            },
            [this.togglerText]
      ) : '';

      return h(
            "div",
            { "class": "Textarea__wrapper" },
            [h(
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
            ), button]
      );
};