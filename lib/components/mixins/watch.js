import isEqual from '../../helpers/is-equal';
import merge from 'merge';

export default function(newVal, oldVal) {

     if (oldVal===newVal) return;
     
      var form = this.getForm();

      var data = {name:this.Name, value: newVal, oldValue: oldVal};

      if (typeof this.items==='object') {
        var selected = this.items.find(item=>item.id===newVal);
        data = merge(data,{selected});
      }

      form.dispatch('change::' + this.Name, data);
      form.dispatch('change', data);
      this.$emit('changed',data);

      if (typeof this.foreignFields!='undefined') {
       this.foreignFields.forEach(function(field){
        if (field) field.validate();
      });
     }

     this.handleTriggeredFields();

     this.dirty = this.wasReset?false:!isEqual(this.curValue,this.initialValue);

     this.pristine = this.wasReset;

     this.wasReset = false;

     if (this.inForm())
      this.validate();

  }