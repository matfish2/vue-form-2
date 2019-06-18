"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {

  return h(
    "span",
    { "class": "VF-Field__file-upload" },
    [h(
      "span",
      { "class": "glyphicon glyphicon-upload VF-Field__file-upload-icon" },
      []
    ), h(
      "input",
      {
        attrs: { disabled: this.disabled,
          type: "file",
          name: this.Name
        },
        "class": "form-control-file" },
      []
    ), this.$scopedSlots.default({
      value: this.value
    })]
  );
};