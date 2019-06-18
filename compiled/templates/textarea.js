"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var button = this.toggler ? h(
    "button",
    {
      attrs: {
        type: "button"
      },
      "class": "btn btn-default btn-xs",
      on: {
        "click": this.toggle.bind(this)
      }
    },
    [this.togglerText]
  ) : "";

  return h(
    "div",
    { "class": "Textarea__wrapper" },
    [h(
      "textarea",
      {
        attrs: {
          name: this.Name,
          id: "textarea_" + this.Name,
          maxlength: this.maxlength,

          disabled: this.disabled,
          placeholder: this.placeholder
        },
        "class": "form-control",
        domProps: {
          "value": this.value
        },
        on: {
          "input": function input(e) {
            return _this.$emit("input", e.target.value);
          }
        }
      },
      []
    ), button]
  );
};