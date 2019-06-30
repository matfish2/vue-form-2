"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var placeholder = "";
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
    if (this.grouped) {
      items = this.items.map(function (item) {
        return h(
          "optgroup",
          {
            attrs: { label: item.text }
          },
          [item.children.map(function (i) {
            return h(
              "option",
              {
                attrs: { value: i.id }
              },
              [i.text]
            );
          })]
        );
      });
    } else {
      items = this.filteredItems.map(function (item) {
        return h(
          "option",
          {
            attrs: { value: item.id }
          },
          [item.text]
        );
      });
    }
  }

  return h(
    "select",
    {
      attrs: {
        name: this.Name + this.arraySymbol,
        disabled: this.disabled,
        multiple: this.multiple
      },
      domProps: {
        "value": this.value
      },
      on: {
        "input": function input(e) {
          return _this.$emit("input", e.target.value);
        }
      },

      "class": "form-control"
    },
    [placeholder, items]
  );
};