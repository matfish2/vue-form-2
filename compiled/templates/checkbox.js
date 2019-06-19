"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var hiddenInput = "";

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
        attrs: {
          type: "checkbox",
          name: this.Name,
          checked: this.value,

          disabled: this.disabled
        },
        on: {
          "change": function change(e) {
            return _this.$emit("input", e.target.checked);
          }
        }
      },
      []
    )]
  );
};