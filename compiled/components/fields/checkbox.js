'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    props: {
      checked: {
        type: Boolean,
        default: undefined
      }
    },
    created: function created() {
      this.wasReset = true;
      this.saveValue(this.checked);
    },
    mounted: function mounted() {

      // if (typeof this.checked=='undefined') {
      //   this.dirty = true;
      // }
    },
    methods: {
      updateValue: function updateValue(e) {
        this.saveValue(e.target.checked);
      },
      reset: function reset() {
        this.wasReset = true;
        this.checked = undefined;
      }
    },
    data: function data() {
      return {
        initialValue: this.checked,
        fieldType: 'checkbox'
      };
    }
  });
};