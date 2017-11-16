"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {

  var hidden = [];

  if (!this.ajax && !this.client) {
    this.additionalValues.map(function (value) {
      hidden.push(h(
        "input",
        {
          attrs: {
            type: "hidden",
            name: value.name
          },
          domProps: {
            "value": value.value
          }
        },
        []
      ));
    });
  };
  return h(
    "form",
    {
      attrs: { action: this.action,
        method: this.method,

        novalidate: true,

        enctype: "multipart/form-data" },
      "class": this.opts.layout,
      on: {
        "submit": this.submit.bind(this)
      },
      slot: "slot" },
    [hidden, this.$slots.default]
  );
};