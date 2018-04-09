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
        attrs: { name: this.Name, type: "hidden", value: "0" }
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
          name: this.Name,
          value: "1",
          checked: this.value,

          disabled: this.disabled },
        on: {
          "change": this.updateValue.bind(this)
        }
      },
      []
    )]
  );
};