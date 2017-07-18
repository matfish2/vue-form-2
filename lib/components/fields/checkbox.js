var merge = require('merge');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(), {
    mounted: function() {
      if (!this.disabled && (typeof this.value == 'undefined' || this.value==='')) {
        this.setValue(false);       
      }
    },
    methods: {
      updateValue: function(e) {
        this.saveValue(e.target.checked);
      },
      setValue(val, isDirty) {
        var value = val && val!='0';
        this.saveValue(value);
        $(this.$el).find("input[type=checkbox][value=1]").prop("checked", value);
      },
      reset: function() {
        this.wasReset = true;
        this.checked = undefined;
        $(this.$el).find("input[type=checkbox][value=1]").prop("checked", false);
        
      }
    },
    data: function() {
      return {
        fieldType:'checkbox',
      }
    }
  });
}

