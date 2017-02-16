'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    data: function data() {
      return {
        fieldType: 'buttons',
        filteringField: null,
        allSelected: false
      };
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      multiple: {
        type: Boolean,
        required: false,
        default: false
      },
      toggleTexts: {
        default: false
      },
      value: {
        required: false,
        default: function _default() {
          return [];
        }
      },
      filterBy: {
        type: String,
        default: ''
      }
    },
    ready: function ready() {

      if (!this.toggleTexts) {
        var inForm = this.inForm();
        var texts = this.getForm().options.texts;

        this.toggleTexts = {
          select: inForm ? texts.selectAll : 'Select All',
          unselect: inForm ? texts.unselectAll : 'Unselect All'
        };
      }

      if (this.filterBy) {
        this.filteringField = this.getField(this.filterBy);

        this.$watch('filterValue', function (val) {
          if (val) {
            this.value = this.multiple ? [] : '';
          }
        }.bind(this));
      }
    },
    computed: {
      type: function type() {
        return this.multiple ? "checkbox" : "radio";
      },
      filterValue: function filterValue() {
        return this.filteringField ? this.filteringField.value : null;
      },
      toggleText: function toggleText() {
        return this.allSelected ? this.toggleTexts.unselect : this.toggleTexts.select;
      },
      arraySymbol: require('../computed/array-symbol')
    },
    methods: {
      updateValue: function updateValue(val, e) {
        var checked = e.target.checked;

        if (this.multiple) {
          if (checked) {
            this.curValue.push(val);
          } else {
            this.curValue = this.curValue.filter(function (value) {
              return value != val;
            });
          }
        } else {
          this.curValue = val;
        }
      },
      isChecked: function isChecked(value) {
        return this.multiple ? this.curValue.indexOf(value) > -1 : value == this.curValue;
      },
      reset: function reset() {
        this.wasReset = true;
        this.curValue = this.multiple ? [] : '';
      },
      passesFilter: function passesFilter(item) {
        if (!this.filterBy || !this.filterValue) return true;

        return item[this.filterBy] == this.filterValue;
      },
      toggle: function toggle() {
        this.allSelected = !this.allSelected;

        if (this.allSelected) {
          this.items.forEach(function (item) {
            if (this.passesFilter(item)) this.value.push(item.id);
          }.bind(this));
        } else {
          this.value = [];
        }
      }
    }
  });
};