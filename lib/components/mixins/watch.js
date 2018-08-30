import merge from 'merge';

export default function(newVal, oldVal) {

  var form = this.getForm();
  
  if (this.inForm() && !form.opts.disableValidation) {
    this.validate();
   }

  if (this.isIdenticalValue(oldVal,newVal)) return;

      var data = {name:this.Name, value: newVal, oldValue: oldVal};

      if (typeof this.flatItems==='object') {
        var val = this.multiple?newVal:[newVal];
        var selected = this.flatItems.filter(item=>val.indexOf(item.id)>-1);
        data = merge(data,{selected});
      }

      if (typeof oldVal)
      form.dispatch('change::' + this.Name, data);
      form.dispatch('change', data);
      this.$emit('changed',data);

      if (typeof this.foreignFields!='undefined') {
       this.foreignFields.forEach(function(field){
        if (field) field.validate();
      });
     }

     this.handleTriggeredFields();

     this.pristine = this.wasReset;

     this.wasReset = false;

  }
