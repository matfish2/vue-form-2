var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    created: function () {
      if (!this.disabled && (typeof this.value == 'undefined' || this.value === '')) {
        this.setValue(false);
      }
    },
    methods: {
      updateValue: function (e) {
        this.saveValue(e.target.checked);
        this.$emit('toggle', e.target.checked);
      },
      setValue(val, isDirty) {
        var value = val && val != '0';
        this.saveValue(value);
      },
      reset: function () {
        this.wasReset = true;
        this.checked = undefined;

      }
    },
    data: function () {
      return {
        fieldType: 'toggler',
      }
    }
  });
}
