"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  return h("input", {
    attrs: { type: "text", name: this.Name },
    domProps: {
      "value": this.formattedValue()
    }
  });
};