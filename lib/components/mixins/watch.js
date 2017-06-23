import isEqual from '../../helpers/is-equal';

export default function(newVal, oldVal) {

     if (oldVal===newVal) return;

      var form = this.getForm();

      form.dispatch('change::' + this.name, {name:this.name, value:newVal, oldValue:oldVal});
      form.dispatch('change', {name:this.name, value:newVal, oldValue:oldVal});

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