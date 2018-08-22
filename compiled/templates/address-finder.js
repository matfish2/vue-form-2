"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require("babel-helper-vue-jsx-merge-props");

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

exports.default = function (h) {
  var _this = this;

  var addressTable = this.curValue ? h(
    "table",
    {
      attrs: { id: "address" }
    },
    [h(
      "tr",
      null,
      [h(
        "td",
        { "class": "label" },
        ["Street address"]
      ), h(
        "td",
        { "class": "slimField" },
        [h(
          "input",
          (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", attrs: { id: "street_number" },
            domProps: {
              "value": _this.curValue.street_number
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) return;
                _this.curValue.street_number = $event.target.value;
              }
            }
          }, {
            directives: [{
              name: "model",
              value: _this.curValue.street_number
            }]
          }, {
            attrs: { disabled: "true" }
          }]),
          []
        )]
      ), h(
        "td",
        { "class": "wideField", attrs: { colspan: "2" }
        },
        [h(
          "input",
          (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", domProps: {
              "value": _this.curValue.route
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) return;
                _this.curValue.route = $event.target.value;
              }
            }
          }, {
            directives: [{
              name: "model",
              value: _this.curValue.route
            }]
          }, {
            attrs: { id: "route", disabled: "true" }
          }]),
          []
        )]
      )]
    ), h(
      "tr",
      null,
      [h(
        "td",
        { "class": "label" },
        ["City"]
      ), h(
        "td",
        { "class": "wideField", attrs: { colspan: "3" }
        },
        [h(
          "input",
          (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", attrs: { id: "locality" },
            domProps: {
              "value": _this.curValue.locality
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) return;
                _this.curValue.locality = $event.target.value;
              }
            }
          }, {
            directives: [{
              name: "model",
              value: _this.curValue.locality
            }]
          }, {
            attrs: { disabled: "true" }
          }]),
          []
        )]
      )]
    ), h(
      "tr",
      null,
      [h(
        "td",
        { "class": "label" },
        ["State"]
      ), h(
        "td",
        { "class": "slimField" },
        [h(
          "input",
          (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", domProps: {
              "value": _this.curValue.administrative_area_level_1
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) return;
                _this.curValue.administrative_area_level_1 = $event.target.value;
              }
            }
          }, {
            directives: [{
              name: "model",
              value: _this.curValue.administrative_area_level_1
            }]
          }, {
            attrs: { id: "administrative_area_level_1", disabled: "true" }
          }]),
          []
        )]
      ), h(
        "td",
        { "class": "label" },
        ["Zip code"]
      ), h(
        "td",
        { "class": "wideField" },
        [h(
          "input",
          (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", domProps: {
              "value": _this.curValue.postal_code
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) return;
                _this.curValue.postal_code = $event.target.value;
              }
            }
          }, {
            directives: [{
              name: "model",
              value: _this.curValue.postal_code
            }]
          }, {
            attrs: { id: "postal_code", disabled: "true" }
          }]),
          []
        )]
      )]
    ), h(
      "tr",
      null,
      [h(
        "td",
        { "class": "label" },
        ["Country"]
      ), h(
        "td",
        { "class": "wideField", attrs: { colspan: "3" }
        },
        [h(
          "input",
          (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", domProps: {
              "value": _this.curValue.country
            },
            on: {
              "input": function input($event) {
                if ($event.target.composing) return;
                _this.curValue.country = $event.target.value;
              }
            }
          }, {
            directives: [{
              name: "model",
              value: _this.curValue.country
            }]
          }, {
            attrs: { id: "country", disabled: "true" }
          }]),
          []
        )]
      )]
    )]
  ) : '';

  return h(
    "div",
    { "class": "address-finder" },
    [h(
      "div",
      {
        attrs: { id: "locationField" }
      },
      [h(
        "input",
        { "class": "autocomplete", on: {
            "focus": this.geolocate
          }
        },
        []
      )]
    ), addressTable]
  );
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }