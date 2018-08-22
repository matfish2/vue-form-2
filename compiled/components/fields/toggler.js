'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    created: function created() {
      if (!this.disabled && (typeof this.value == 'undefined' || this.value === '')) {
        this.setValue(false);
      }
    },
    methods: {
      updateValue: function updateValue(e) {
        this.saveValue(e.target.checked);
        this.$emit('toggle', e.target.checked);
      },
      setValue: function setValue(val, isDirty) {
        var value = val && val != '0';
        this.saveValue(value);
      },

      reset: function reset() {
        this.wasReset = true;
        this.checked = undefined;
      }
    },
    data: function data() {
      return {
        fieldType: 'toggler'
      };
    }
  });
};