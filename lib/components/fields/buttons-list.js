var merge = require('merge');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(),{
    data: function() {
      return {
        fieldType:'buttons',
        filteringField:null,
        allSelected:false
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
      toggleTexts:{
        default: false
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
    ready: function() {

      if (!this.toggleTexts) {
        var inForm = this.inForm();
        var texts = this.getForm().options.texts;

        this.toggleTexts = {
          select:inForm?texts.selectAll:'Select All',
          unselect:inForm?texts.unselectAll:'Unselect All'
        }
      }

      if (this.filterBy) {
        this.filteringField = this.getField(this.filterBy);

        this.$watch('filterValue', function(val) {
          if (val) {
           this.value = this.multiple?[]:'';
         }
       }.bind(this));
      }
    },
    computed: {
      type: function() {
        return this.multiple?"checkbox":"radio";
      },
      filterValue: function() {
        return this.filteringField?this.filteringField.value:null;
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

      $(`[name=${this.name}]`).each(function () {
        el = $(this);
        val = el.val();
        el.prop('checked', this.multiple?value.indexOf(val)>-1:val==value);
      });
    },
    updateValue: function(val, e) {
      let checked = e.target.checked;

      if (this.multiple) {
        var value = this.getValue();

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
    toggle: function() {
      this.allSelected = !this.allSelected;

      if (this.allSelected) {
        this.items.forEach(function(item) {
          if (this.passesFilter(item))
            this.value.push(item.id);
        }.bind(this));
      } else {
        this.value = [];
      }
    }
  }
});
}

