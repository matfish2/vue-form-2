"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  return h(
    "input",
    {
      attrs: {
        type: "text",
        name: this.Name,

        disabled: this.disabled
      },
      "class": "form-control", domProps: {
        "value": this.formattedValue()
      }
    },
    []
  );
};