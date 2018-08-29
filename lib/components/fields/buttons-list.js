var merge = require('merge');
var Field = require('./field');
import clone from 'clone';

module.exports = function () {
  return merge.recursive(Field(), {
    data: function () {
      return {
        fieldType: 'buttons',
        allSelected: false,
        filteringField: null,
        allSelected: false,
        clearText: 'Clear',
        toggleTexts: {
          select: 'Select All',
          unselect: 'Unselect All'
        },
      }
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
      value: {
        required: false,
        default: function () {
          return [];
        },
      },
      filterBy: {
        type: String,
        default: ''
      },
      horizontal: Boolean
    },
    mounted: function () {

      this.allSelected = this.selectedCount === this.filteredItems.length;

      this.$watch('selectedCount', (val) => {
        if (this.selectedCount === 0) {
          this.allSelected = false;
        } else if (this.selectedCount === this.filteredItems.length) {
          this.allSelected = true;
        }
      });

      if (this.inForm()) {

        var texts = this.getForm().opts.texts;

        if (texts.selectAll) {
          this.toggleTexts = {
            select: texts.selectAll,
            unselect: texts.unselectAll
          }
        }
      }

      this.clearText = texts.clear;


      if (this.filterBy) {
        this.filteringField = this.getField(this.filterBy);

        this.$watch('filterValue', function (val) {
          if (val) {
            this.emit('input',this.multiple ? [] : '');
          }
        }.bind(this));
      }
    },
    computed: {
      type: function () {
        return this.multiple ? "checkbox" : "radio";
      },
      selectedCount() {
        if (!this.multiple) return false;

        return this.value.length;
      },
      filteredItems: function () {
        return this.items.filter(item => this.passesFilter(item));
      },
      filterValue: function () {
        return this.filteringField ? this.filteringField.value : null;
      },
      toggleText: function () {
        return this.allSelected ? this.toggleTexts.unselect : this.toggleTexts.select;
      },
      itemClass() {
        return this.horizontal ? 'form-check horizontal' : 'form-check';
      },
      arraySymbol: require('../computed/array-symbol')
    },
    methods: {
      clear() {
        this.setValue(null);
      },
      isChecked: function (value) {
        var val = this.value;
        return this.multiple ? val.indexOf(value) > -1 : value == val;
      },
      reset: function () {
        this.wasReset = true;
        this.saveValue(this.multiple ? [] : '');
      },
      passesFilter: function (item) {
        if (!this.filterBy || !this.filterValue)
          return true;

        return (item[this.filterBy] == this.filterValue);

      },
      toggle: function toggle() {

        this.allSelected = !this.allSelected;

        if (this.allSelected) {
          this.setValue(this.filteredItems.map(item => item.id));
        } else {
          this.setValue([]);
        }
      }
    }
  });
}
