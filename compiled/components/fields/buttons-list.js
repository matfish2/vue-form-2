"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var merge = require("merge");
var Field = require("./field");

module.exports = function () {
  return merge.recursive(Field(), {
    data: function data() {
      var _ref;

      return _ref = {
        fieldType: "buttons",
        allSelected: false,
        filteringField: null
      }, _defineProperty(_ref, "allSelected", false), _defineProperty(_ref, "clearText", "Clear"), _defineProperty(_ref, "toggleTexts", {
        select: "Select All",
        unselect: "Unselect All"
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
        default: ""
      },
      horizontal: Boolean
    },
    mounted: function mounted() {
      var _this = this;

      this.allSelected = this.selectedCount === this.filteredItems.length;

      this.$watch("selectedCount", function (val) {
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

        this.$watch("filterValue", function (val) {
          if (val) {
            this.emit("input", this.multiple ? [] : "");
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

        return this.value.length;
      },

      filteredItems: function filteredItems() {
        var _this2 = this;

        return this.items.filter(function (item) {
          return _this2.passesFilter(item);
        });
      },
      filterValue: function filterValue() {
        return this.filteringField ? this.filteringField.value : null;
      },
      toggleText: function toggleText() {
        return this.allSelected ? this.toggleTexts.unselect : this.toggleTexts.select;
      },
      itemClass: function itemClass() {
        return this.horizontal ? "form-check horizontal" : "form-check";
      },

      arraySymbol: require("../computed/array-symbol")
    },
    methods: {
      clear: function clear() {
        this.setValue(null);
      },

      isChecked: function isChecked(value) {
        var val = this.value;
        var isChecked = this.multiple ? val.indexOf(value) > -1 : value == val;

        var d = document.querySelector("input[value=" + value + "]");
        if (d) {
          d.checked = isChecked;
        }

        return isChecked;
      },
      reset: function reset() {
        this.wasReset = true;
        this.saveValue(this.multiple ? [] : "");
      },
      passesFilter: function passesFilter(item) {
        if (!this.filterBy || !this.filterValue) return true;

        return item[this.filterBy] == this.filterValue;
      },
      updateValue: function updateValue(e) {
        var val;
        if (this.multiple) {
          if (e.target.checked) {
            val = this.value.concat(e.target.value);
          } else {
            val = this.value.filter(function (v) {
              return v != e.target.value;
            });
          }
        } else {
          val = e.target.value;
        }

        this.$emit("input", val);
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