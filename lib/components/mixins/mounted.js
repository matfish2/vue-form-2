import merge from 'merge'
var convertDateRulesToMoment = require('../../helpers/convert-date-rules-to-moment');

module.exports = {
  mounted: function() {

    this.Rules = merge(this.Rules, this.rules);

    if (this.required) {
      this.$set(this.Rules, 'required', true);
    }

    let inForm = this.inForm();
    let form = null;

    if (inForm && this.name) {

      form = this.getForm();

      if (form.opts.sendOnlyDirtyFields) {

          this.$watch('dirty', (isDirty) => {

            if (isDirty) {
              form.fields.push(this);
            } else if (form.opts.removePristineFields) {
              if (form.vuex) {
                this.commit('RESET', {name:this.name});
              } 
            
             form.fields =  form.fields.filter(field => field.name!=this.name)
           }
         });


      } else {
        if (form.vuex) {
          this.commit('CHANGE', {name:this.name, value:this.value, oldValue:this.value});
        }

        form.fields.push(this);
      }


      let v = form.validation;

      if (v.rules && v.rules.hasOwnProperty(this.name)) {
        this.Rules = convertDateRulesToMoment(merge(this.Rules, v.rules[this.name]));
      }

      if (typeof v.messages!='undefined' &&  v.messages.hasOwnProperty(this.name))
        this.messages = v.messages[this.name];

      if (!form.opts.disableValidation) {
        setTimeout(function() {
          this.validate();
        }.bind(this),0);  
      }
     
      if (form.relatedFields.hasOwnProperty(this.name))
        this.foreignFields = form.relatedFields[this.name].map(function(name) {
          return form.getField(name);
        });


      if (form.triggeredFields.hasOwnProperty(this.name))
       this.triggeredFields = form.triggeredFields[this.name].map(function(name) {
        return form.getField(name);
      });

     setTimeout(()=>{
      this.handleTriggeredFields();
    },0);

   }
    
  }
}

