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
        attrs: { type: "hidden", name: this.name, value: this.serverFormat }
      },
      []
    );
  }

  return h(
    "div",
    null,
    [h(
      "input",
      { "class": "VF-Field--Date__datepicker form-control",
        attrs: { name: this.name,
          placeholder: this.placeholder,
          value: this.formattedDate,

          type: "text" },
        on: {
          "change": this.updateValue.bind(this)
        }
      },
      []
    ), hiddenInput]
  );
};