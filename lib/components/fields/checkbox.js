var merge = require('merge');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(), {
    props: {
      checked: {
        type: Boolean,
        default:undefined
      }
    },
    created: function() {
     this.wasReset = true;
     this.saveValue(this.checked);
    },
    mounted: function() {


      // if (typeof this.checked=='undefined') {
      //   this.dirty = true;
      // }
    },
    methods: {
      updateValue: function(e) {
        this.saveValue(e.target.checked);
      },
      reset: function() {
        this.wasReset = true;
        this.checked = undefined;
      }
    },
    data: function() {
      return {
        initialValue: this.checked,
        fieldType:'checkbox',
      }
    }
});
}

