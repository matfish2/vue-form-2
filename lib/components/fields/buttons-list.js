var merge = require('merge');
var Field = require('./field');
import clone from 'clone';

module.exports = function() {
  return merge.recursive(Field(),{
    data: function() {
      return {
        fieldType:'buttons',
        allSelected:false,
        filteringField:null,
        allSelected:false,
        clearText:'Clear',
        toggleTexts:{
          select:'Select All',
          unselect:'Unselect All'
        },
      }
    },
    props: {
      items: {
        type:Array,
        required:true
      },
      multiple:{
        type: Boolean,
        required:false,
        default:false
      },
      value: {
        required:false,
        default:function() {
          return [];
        },
      },
      filterBy: {
        type: String,
        default: ''
      },
      horizontal:Boolean
    },
    mounted: function() {

     this.allSelected = this.selectedCount===this.filteredItems.length;

     this.$watch('selectedCount', (val) => {
      if (this.selectedCount===0) {
        this.allSelected = false;
      } else if (this.selectedCount===this.filteredItems.length) {
        this.allSelected = true;
      }
    });

     if (this.inForm()) {

      var texts = this.getForm().opts.texts;

      if (texts.selectAll) {
        this.toggleTexts = {
          select:texts.selectAll,
          unselect:texts.unselectAll
        }   
      }   
    }

    this.clearText = texts.clear;


    if (this.filterBy) {
      this.filteringField = this.getField(this.filterBy);

      this.$watch('filterValue', function(val) {
        if (val) {
         this.setValue(this.multiple?[]:'');
       }
     }.bind(this));
    }
  },
  computed: {
    type: function() {
      return this.multiple?"checkbox":"radio";
    },
    selectedCount() {
      if (!this.multiple) return false;

      return this.curValue.length;
    },
    filteredItems: function() {
      return this.items.filter(item=>this.passesFilter(item));
    },
    filterValue: function() {
      return this.filteringField?this.filteringField.getValue():null;
    },
    toggleText: function() {
      return this.allSelected?this.toggleTexts.unselect:this.toggleTexts.select;
    },
    itemClass() {
      return this.horizontal?'form-check horizontal':'form-check';
    },
    arraySymbol: require('../computed/array-symbol')
  },
  methods: {
   setValue(value) {

    var el, val;

    this.saveValue(value);

    var name = this.multiple?this.name+"[]":this.name;
    var multiple = this.multiple;

    $('[name="' + name + '"]').each(function () {
      el = $(this);
      val = el.val();
      el.prop('checked', multiple ? value.indexOf(val) > -1 : val == value);
    });
  },
  clear() {
    this.setValue(null);
  },
  updateValue: function(val, e) {
    let checked = e.target.checked;

    if (this.multiple) {
      var value = clone(this.getValue());

      if (checked) {
        value.push(val);
        this.saveValue(value);
      } else {

        value = value.filter(function(value) {
          return value!=val;
        });
        this.saveValue(value);
      }
    } else {
      this.saveValue(val);
    }
  },
  isChecked: function (value) {
    var val = this.getValue();
    return this.multiple?val.indexOf(value)>-1:value==val;
  },
  reset: function() {
    this.wasReset = true;
    this.saveValue(this.multiple?[]:'');
  },
  passesFilter:function(item) {
    if (!this.filterBy || !this.filterValue)
      return true;

    return (item[this.filterBy]==this.filterValue);

  },
  toggle: function toggle() {

    this.allSelected = !this.allSelected;

    if (this.allSelected) {
      this.setValue(this.filteredItems.map(item=>item.id));
    } else {
      this.setValue([]);
    }
  }
}
});
}

