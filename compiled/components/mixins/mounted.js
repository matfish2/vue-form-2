'use strict';

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  mounted: function mounted() {
    var _this = this;

    if (this.value) this.setValue(this.value);

    if (this.required) {
      this.Rules.required = true;
    }

    this.Rules = (0, _merge2.default)(this.Rules, this.rules);

    var inForm = this.inForm();

    if (inForm) {

      var form = this.getForm();

      if (form.opts.sendOnlyDirtyFields) {

        this.$watch('dirty', function (isDirty) {
          if (isDirty) {
            form.fields.push(_this);
          } else if (form.opts.removePristineFields) {
            form.fields = form.fields.filter(function (field) {
              return field.name != _this.name;
            });
          }
        });
      } else {
        form.fields.push(this);
      }

      var v = this.getForm().validation;

      if (v.rules && v.rules.hasOwnProperty(this.name)) {
        this.Rules = v.rules[this.name];
      }

      if (typeof v.messages != 'undefined' && v.messages.hasOwnProperty(this.name)) this.messages = v.messages[this.name];

      setTimeout(function () {
        this.validate();
      }.bind(this), 0);

      if (form.relatedFields.hasOwnProperty(this.name)) this.foreignFields = form.relatedFields[this.name].map(function (name) {
        return form.getField(name);
      });

      if (form.triggeredFields.hasOwnProperty(this.name)) this.triggeredFields = form.triggeredFields[this.name].map(function (name) {
        return form.getField(name);
      });

      this.handleTriggeredFields();
    }
  }
};