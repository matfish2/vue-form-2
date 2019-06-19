"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  return h(
    "date-picker",
    {
      attrs: {
        value: this.value,

        config: this.options
      },
      on: {
        "input": function input(value) {
          return _this.$emit("input", value);
        }
      }
    },
    []
  );
};