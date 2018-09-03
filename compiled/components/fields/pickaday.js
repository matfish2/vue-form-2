'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    data: function data() {
      return {
        fieldType: 'pickaday'
      };
    },
    mounted: function mounted() {
      var self = this;
      this.picker = new Pikaday({
        field: this.$el,
        onSelect: function onSelect(e) {
          self.$emit('input', e);
        }
      });
    },

    methods: {
      formattedValue: function formattedValue() {
        if (!this.picker || !this.value) return '';

        return this.picker.toString('DD-MM-YYYY');
      }
    }
  });
};