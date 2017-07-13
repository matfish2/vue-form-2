'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    mounted: function mounted() {
      if (typeof this.value == 'undefined' || this.value === '') {
        this.setValue(false);
      }
    },
    methods: {
      updateValue: function updateValue(e) {
        this.saveValue(e.target.checked);
      },
      setValue: function setValue(val, isDirty) {
        var value = val && val != '0';
        this.saveValue(value);
        $(this.$el).find("input[type=checkbox][value=1]").prop("checked", value);
      },

      reset: function reset() {
        this.wasReset = true;
        this.checked = undefined;
        $(this.$el).find("input[type=checkbox][value=1]").prop("checked", false);
      }
    },
    data: function data() {
      return {
        fieldType: 'checkbox'
      };
    }
  });
};