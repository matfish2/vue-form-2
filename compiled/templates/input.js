"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var addon = this.addon ? h(
    "span",
    { "class": "input-group-addon" },
    [h(
      "i",
      { "class": "fa fa-" + this.addon + " fa-lg" },
      []
    )]
  ) : "";

  var afterAddon = this.afterAddon ? h(
    "span",
    { "class": "input-group-addon" },
    [this.afterAddon]
  ) : "";

  return h(
    "div",
    { "class": "input-group" },
    [addon, h(
      "input",
      {
        attrs: {
          type: this.fieldType,
          name: this.Name,

          placeholder: this.placeholder,
          disabled: this.disabled,
          minlength: this.minlength,
          maxlength: this.maxlength,
          autocomplete: this.autocomplete
        },
        domProps: {
          "value": this.value
        },
        on: {
          "input": function input(e) {
            return _this.$emit("input", e.target.value);
          }
        },

        "class": "form-control" },
      []
    ), afterAddon]
  );
};