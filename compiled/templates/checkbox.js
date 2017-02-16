"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var hiddenInput = '';

  if (this.inForm() && this.getForm().server) {
    hiddenInput = h(
      "input",
      {
        attrs: { name: this.name, type: "hidden", value: "0" }
      },
      []
    );
  }

  return h(
    "div",
    null,
    [hiddenInput, h(
      "input",
      {
        attrs: { type: "checkbox",
          name: this.name,
          value: "1",
          checked: this.checked,

          disabled: this.disabled },
        on: {
          "change": this.updateValue.bind(this)
        }
      },
      []
    )]
  );
};