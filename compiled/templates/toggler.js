"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  return h(
    "label",
    { "class": "switch" },
    [h(
      "input",
      {
        attrs: { type: "checkbox",
          name: this.Name,
          checked: this.value
        },
        on: {
          "change": function change(e) {
            return _this.$emit('input', e.target.checked);
          }
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