'use strict';

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var merge = require('merge');
var Field = require('./field');


module.exports = function () {
  return merge.recursive(Field(), {
    data: function data() {
      var _ref;

      return _ref = {
        fieldType: 'buttons',
        allSelected: false,
        filteringField: null
      }, _defineProperty(_ref, 'allSelected', false), _defineProperty(_ref, 'clearText', 'Clear'), _defineProperty(_ref, 'toggleTexts', {
        select: 'Select All',
        unselect: 'Unselect All'
      }), _ref;
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
        default: function _default() {
          return [];
        }
      },
      filterBy: {
        type: String,
        default: ''
      },
      horizontal: Boolean
    },
    mounted: function mounted() {
      var _this = this;

      this.allSelected = this.selectedCount === this.filteredItems.length;

      this.$watch('selectedCount', function (val) {
        if (_this.selectedCount === 0) {
          _this.allSelected = false;
        } else if (_this.selectedCount === _this.filteredItems.length) {
          _this.allSelected = true;
        }
      });

      if (this.inForm()) {

        var texts = this.getForm().opts.texts;

        if (texts.selectAll) {
          this.toggleTexts = {
            select: texts.selectAll,
            unselect: texts.unselectAll
          };
        }
      }

      this.clearText = texts.clear;

      if (this.filterBy) {
        this.filteringField = this.getField(this.filterBy);

        this.$watch('filterValue', function (val) {
          if (val) {
            this.setValue(this.multiple ? [] : '');
          }
        }.bind(this));
      }
    },
    computed: {
      type: function type() {
        return this.multiple ? "checkbox" : "radio";
      },
      selectedCount: function selectedCount() {
        if (!this.multiple) return false;

        return this.curValue.length;
      },

      filteredItems: function filteredItems() {
        var _this2 = this;

        return this.items.filter(function (item) {
          return _this2.passesFilter(item);
        });
      },
      filterValue: function filterValue() {
        return this.filteringField ? this.filteringField.getValue() : null;
      },
      toggleText: function toggleText() {
        return this.allSelected ? this.toggleTexts.unselect : this.toggleTexts.select;
      },
      itemClass: function itemClass() {
        return this.horizontal ? 'form-check horizontal' : 'form-check';
      },

      arraySymbol: require('../computed/array-symbol')
    },
    methods: {
      setValue: function setValue(value) {

        var el, val;

        this.saveValue(value);

        var name = this.multiple ? this.Name + "[]" : this.Name;
        var multiple = this.multiple;

        $('[name="' + name + '"]').each(function () {
          el = $(this);
          val = el.val();
          el.prop('checked', multiple ? value.indexOf(val) > -1 : val == value);
        });
      },
      clear: function clear() {
        this.setValue(null);
      },

      updateValue: function updateValue(val, e) {
        var checked = e.target.checked;

        if (this.multiple) {
          var value = (0, _clone2.default)(this.getValue());

          if (checked) {
            value.push(val);
            this.saveValue(value);
          } else {

            value = value.filter(function (value) {
              return value != val;
            });
            this.saveValue(value);
          }
        } else {
          this.saveValue(val);
        }
      },
      isChecked: function isChecked(value) {
        var val = this.getValue();
        return this.multiple ? val.indexOf(value) > -1 : value == val;
      },
      reset: function reset() {
        this.wasReset = true;
        this.saveValue(this.multiple ? [] : '');
      },
      passesFilter: function passesFilter(item) {
        if (!this.filterBy || !this.filterValue) return true;

        return item[this.filterBy] == this.filterValue;
      },
      toggle: function toggle() {

        this.allSelected = !this.allSelected;

        if (this.allSelected) {
          this.setValue(this.filteredItems.map(function (item) {
            return item.id;
          }));
        } else {
          this.setValue([]);
        }
      }
    }
  });
};