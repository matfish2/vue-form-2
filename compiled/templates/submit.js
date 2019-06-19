"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var disabled = this.disabled ? "disabled" : "";
  var sendingIndicator = this.sending ? h(
    "i",
    { "class": "ckspin fa fa-fw fa-spinner fa-spin fa-lg" },
    []
  ) : "";

  return h(
    "button",
    {
      attrs: {
        type: "submit"
      },
      "class": "VF-Submit__button btn btn-primary pull-right " + disabled
    },
    [sendingIndicator, this.text]
  );
};