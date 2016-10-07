let isEqual = require('../../helpers/is-equal');
import bus from '../../../bus'

export default {
  watch: {
    curValue: function(newVal, oldVal) {

      bus.$emit('vue-form.change::' + this.name, {name:this.name, value:newVal, oldValue:oldVal});
      bus.$emit('vue-form.change', {name:this.name, value:newVal, oldValue:oldVal});

      if (typeof this.foreignFields!='undefined') {
       this.foreignFields.forEach(function(field){
        field.validate();
      });
     }

     this.handleTriggeredFields();

     this.dirty = this.wasReset?false:!isEqual(this.curValue,this.initialValue);

     this.pristine = this.wasReset;

     this.wasReset = false;

     if (this.inForm())
      this.validate();

  }
}
}
