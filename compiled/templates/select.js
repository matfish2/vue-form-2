"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var placeholder = '';
  var items = [];

  if (!this.noDefault && !this.multiple) {
    placeholder = h(
      "option",
      {
        attrs: { value: "" }
      },
      [this.placeholder]
    );
  }

  if (!this.select2 || this.ajaxUrl || this.html || this.filterBy) {

    items = this.filteredItems.map(function (item) {
      return h(
        "option",
        {
          attrs: { value: item.id, selected: item.id == _this.curValue }
        },
        [item.text]
      );
    });
  }

  return this.render ? h(
    "select",
    {
      attrs: { name: this.Name + this.arraySymbol,
        disabled: this.disabled,
        multiple: this.multiple
      },
      on: {
        "change": this.updateValue.bind(this)
      },

      "class": "form-control" },
    [placeholder, items]
  ) : '';
};