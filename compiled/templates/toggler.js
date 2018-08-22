"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  return h(
    "label",
    { "class": "switch" },
    [h(
      "input",
      {
        attrs: { type: "checkbox",
          name: this.Name,
          checked: this.curValue
        },
        on: {
          "change": this.updateValue.bind(this)
        }
      },
      []
    ), h(
      "span",
      { "class": "slider round" },
      []
    )]
  );
};