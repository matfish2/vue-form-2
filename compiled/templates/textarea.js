"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _babelHelperVueJsxMergeProps = require("babel-helper-vue-jsx-merge-props");

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

exports.default = function (h) {
      var _this = this;

      var button = this.toggler ? h(
            "button",
            {
                  attrs: { type: "button" },
                  "class": "btn btn-default btn-xs", on: {
                        "click": this.toggle.bind(this)
                  }
            },
            [this.togglerText]
      ) : '';

      return h(
            "div",
            { "class": "Textarea__wrapper" },
            [h(
                  "textarea",
                  (0, _babelHelperVueJsxMergeProps2.default)([{
                        attrs: {
                              name: this.Name,
                              id: "textarea_" + this.Name,
                              maxlength: this.maxlength
                        },
                        "class": "form-control",
                        domProps: {
                              "value": _this.value
                        },
                        on: {
                              "input": function input($event) {
                                    if ($event.target.composing) return;
                                    _this.value = $event.target.value;
                              }
                        }
                  }, {
                        directives: [{
                              name: "model",
                              value: _this.value
                        }]
                  }, {
                        attrs: {
                              disabled: this.disabled,
                              placeholder: this.placeholder }
                  }]),
                  []
            ), button]
      );
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }