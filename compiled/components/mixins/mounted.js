"use strict";

var _merge = require("merge");

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertDateRulesToMoment = require("../../helpers/convert-date-rules-to-moment");

module.exports = {
  mounted: function mounted() {
    var _this = this;

    this.Rules = (0, _merge2.default)(this.Rules, this.rules);

    if (this.required) {
      this.$set(this.Rules, "required", true);
    }

    var inForm = this.inForm();
    var form = null;

    if (inForm && this.name) {
      form = this.getForm();

      if (form.opts.sendOnlyDirtyFields) {
        this.$watch("dirty", function (isDirty) {
          if (isDirty) {
            form.vffields.push(_this);
          } else if (form.opts.removePristineFields) {
            if (form.vuex) {
              _this.commit("RESET", { name: _this.name });
            }

            form.vffields = form.vffields.filter(function (field) {
              return field.name != _this.name;
            });
          }
        });
      } else {
        if (form.vuex) {
          this.commit("CHANGE", {
            name: this.name,
            value: this.value,
            oldValue: this.value
          });
        }

        form.vffields.push(this);
      }

      var v = form.validation;

      if (v.rules && v.rules.hasOwnProperty(this.name)) {
        this.Rules = convertDateRulesToMoment((0, _merge2.default)(this.Rules, v.rules[this.name]));
      }

      if (typeof v.messages != "undefined" && v.messages.hasOwnProperty(this.name)) this.messages = v.messages[this.name];

      if (!form.opts.disableValidation) {
        setTimeout(function () {
          this.validate();
        }.bind(this), 0);
      }

      if (form.relatedFields.hasOwnProperty(this.name)) this.foreignFields = form.relatedFields[this.name].map(function (name) {
        return form.getField(name);
      });

      if (form.triggeredFields.hasOwnProperty(this.name)) this.triggeredFields = form.triggeredFields[this.name].map(function (name) {
        return form.getField(name);
      });

      setTimeout(function () {
        _this.handleTriggeredFields();
      }, 0);
    }
  }
};