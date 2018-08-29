"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelHelperVueJsxMergeProps = require("babel-helper-vue-jsx-merge-props");

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

exports.default = function (h) {
  var _this = this;

  return h(
    "label",
    { "class": "switch" },
    [h("input", (0, _babelHelperVueJsxMergeProps2.default)([{
      attrs: { type: "checkbox",
        name: this.Name,
        checked: Array.isArray(_this.value) ? this._i(_this.value, null) > -1 : _this.value
      },
      on: {
        "__c": function __c($event) {
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
      on: {
        "change": function change(e) {
          return _this.$emit('input', e.target.checked);
        }
      }
    }])), h("span", { "class": "slider round" })]
  );
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }