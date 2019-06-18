"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require("babel-helper-vue-jsx-merge-props");

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

exports.default = function (h) {
  var _this = this;

  var hiddenInput = '';

  if (this.inForm() && this.getForm().server) {
    hiddenInput = h(
      "input",
      {
        attrs: { name: this.Name, type: "hidden", value: "0" }
      },
      []
    );
  }

  return h(
    "div",
    null,
    [hiddenInput, h(
      "input",
      (0, _babelHelperVueJsxMergeProps2.default)([{
        attrs: { type: "checkbox",
          name: this.Name,
          checked: Array.isArray(_this.value) ? this._i(_this.value, null) > -1 : _this.value,
          on__c: function on__c($event) {
            var $$a = _this.value,
                $$el = $event.target,
                $$c = $$el.checked ? true : false;

            if (Array.isArray($$a)) {
              var $$v = null,
                  $$i = _this._i($$a, $$v);

              if ($$el.checked) {
                $$i < 0 && (_this.value = $$a.concat($$v));
              } else {
                $$i > -1 && (_this.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
              }
            } else {
              _this.value = $$c;
            }
          }
        }
      }, {
        directives: [{
          name: "model",
          value: _this.value
        }]
      }, {
        attrs: {
          disabled: this.disabled }
      }]),
      []
    )]
  );
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }