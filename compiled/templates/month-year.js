"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  return h(
    "div",
    null,
    [h(
      "select",
      {
        domProps: {
          "value": this.selected.month
        },
        on: {
          "input": function input(e) {
            return _this.updateValue(e.target.value, "month");
          }
        }
      },
      [h(
        "option",
        {
          attrs: { value: "" }
        },
        ["Month"]
      ), this.months.map(function (month) {
        return h(
          "option",
          {
            attrs: { value: month }
          },
          [month]
        );
      })]
    ), h(
      "select",
      {
        domProps: {
          "value": this.selected.year
        },
        on: {
          "input": function input(e) {
            return _this.updateValue(e.target.value, "year");
          }
        }
      },
      [h(
        "option",
        {
          attrs: { value: "" }
        },
        ["Year"]
      ), this.years.map(function (year) {
        return h(
          "option",
          {
            attrs: { value: year }
          },
          [year]
        );
      })]
    )]
  );
};