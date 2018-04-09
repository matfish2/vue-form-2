var merge = require('merge');
var Field = require('./field');

import updateValue from '../methods/update-value'

module.exports = function() {
 return merge.recursive(Field(), {
   props: {
    placeholder: {
      type:String,
      required:false,
      default:''
    },
    debounce:{
      type:Number,
      default:300
    },
    lazy:{
      type:Boolean
    },
    minlength: Number,
    maxlength: Number,
    autocomplete: String,
  },
  data: function() {
    return {
     lastKeyStroke:new Date()
   }
 },
 methods:{
  setValue(val, setDirty = true) {
    this.saveValue(val);
    if (setDirty) this.dirty = true;
    document.getElementsByName(this.Name)[0].value = val;
  },
  reset() {
   this.saveValue('');
   this.wasReset = true;
   document.getElementsByName(this.Name)[0].value = '';
 },
 updateValue
}
});

}



