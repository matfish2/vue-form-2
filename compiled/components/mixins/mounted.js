'use strict';

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _watch = require('./watch');

var _watch2 = _interopRequireDefault(_watch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertDateRulesToMoment = require('../../helpers/convert-date-rules-to-moment');

module.exports = {
  mounted: function mounted() {
    var _this = this;

    if (this.required) {
      this.Rules.required = true;
    }

    this.Rules = (0, _merge2.default)(this.Rules, this.rules);

    var inForm = this.inForm();
    var form = null;

    if (inForm && this.name) {

      form = this.getForm();

      if (form.opts.sendOnlyDirtyFields) {

        if (!form.vuex) {
          this.$watch('dirty', function (isDirty) {
            if (isDirty) {
              form.fields.push(_this);
            } else if (form.opts.removePristineFields) {
              form.fields = form.fields.filter(function (field) {
                return field.name != _this.name;
              });
            }
          });
        }
      } else {
        form.vuex ? this.commit('CHANGE', { name: this.name, value: this.value, oldValue: this.value }) : form.fields.push(this);
      }

      var v = form.validation;

      if (v.rules && v.rules.hasOwnProperty(this.name)) {
        this.Rules = convertDateRulesToMoment((0, _merge2.default)(this.Rules, v.rules[this.name]));
      }

      if (typeof v.messages != 'undefined' && v.messages.hasOwnProperty(this.name)) this.messages = v.messages[this.name];

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

    if (form && form.opts.fireChangeOnInit) this.$watch('curValue', _watch2.default);

    if (this.value || this.fieldType === 'checkbox') {
      this.setValue(this.value, false); // don't set as dirty on init
    }

    if (!form || !form.opts.fireChangeOnInit) this.$watch('curValue', _watch2.default);

    this.$watch('value', function (value) {
      if (value === '') {
        _this.reset();
      } else {
        _this.setValue(value);
      }
    });
  }
};