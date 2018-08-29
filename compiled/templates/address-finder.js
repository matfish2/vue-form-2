"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require("babel-helper-vue-jsx-merge-props");

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

exports.default = function (h) {
  var _this = this;

  var addressTable = this.value ? h(
    "table",
    {
      attrs: { id: "address" }
    },
    [h("tr", [h(
      "td",
      { "class": "label" },
      ["Street address"]
    ), h(
      "td",
      { "class": "slimField" },
      [h("input", (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", attrs: { id: "street_number" },
        domProps: {
          "value": _this.value.street_number
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) return;
            _this.value.street_number = $event.target.value;
          }
        }
      }, {
        directives: [{
          name: "model",
          value: _this.value.street_number
        }]
      }, {
        attrs: { disabled: "true" }
      }]))]
    ), h(
      "td",
      { "class": "wideField", attrs: { colspan: "2" }
      },
      [h("input", (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", domProps: {
          "value": _this.value.route
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) return;
            _this.value.route = $event.target.value;
          }
        }
      }, {
        directives: [{
          name: "model",
          value: _this.value.route
        }]
      }, {
        attrs: { id: "route", disabled: "true" }
      }]))]
    )]), h("tr", [h(
      "td",
      { "class": "label" },
      ["City"]
    ), h(
      "td",
      { "class": "wideField", attrs: { colspan: "3" }
      },
      [h("input", (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", attrs: { id: "locality" },
        domProps: {
          "value": _this.value.locality
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) return;
            _this.value.locality = $event.target.value;
          }
        }
      }, {
        directives: [{
          name: "model",
          value: _this.value.locality
        }]
      }, {
        attrs: { disabled: "true" }
      }]))]
    )]), h("tr", [h(
      "td",
      { "class": "label" },
      ["State"]
    ), h(
      "td",
      { "class": "slimField" },
      [h("input", (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", domProps: {
          "value": _this.value.administrative_area_level_1
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) return;
            _this.value.administrative_area_level_1 = $event.target.value;
          }
        }
      }, {
        directives: [{
          name: "model",
          value: _this.value.administrative_area_level_1
        }]
      }, {
        attrs: { id: "administrative_area_level_1", disabled: "true" }
      }]))]
    ), h(
      "td",
      { "class": "label" },
      ["Zip code"]
    ), h(
      "td",
      { "class": "wideField" },
      [h("input", (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", domProps: {
          "value": _this.value.postal_code
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) return;
            _this.value.postal_code = $event.target.value;
          }
        }
      }, {
        directives: [{
          name: "model",
          value: _this.value.postal_code
        }]
      }, {
        attrs: { id: "postal_code", disabled: "true" }
      }]))]
    )]), h("tr", [h(
      "td",
      { "class": "label" },
      ["Country"]
    ), h(
      "td",
      { "class": "wideField", attrs: { colspan: "3" }
      },
      [h("input", (0, _babelHelperVueJsxMergeProps2.default)([{ "class": "field", domProps: {
          "value": _this.value.country
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) return;
            _this.value.country = $event.target.value;
          }
        }
      }, {
        directives: [{
          name: "model",
          value: _this.value.country
        }]
      }, {
        attrs: { id: "country", disabled: "true" }
      }]))]
    )])]
  ) : '';

  return h(
    "div",
    { "class": "address-finder" },
    [h(
      "div",
      {
        attrs: { id: "locationField" }
      },
      [h("input", { "class": "autocomplete", on: {
          "focus": this.geolocate
        }
      })]
    ), addressTable]
  );
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }