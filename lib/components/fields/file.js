var merge = require('merge');
var clone = require('clone');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(),{
    data: function() {
      return {
        fieldType:'file'
      }
    },
    props: {
      options: {
        type: Object,
        required:false,
        default: function() {
          return {};
        }
      },
      ajax: {
        type: Boolean
      },
      dest: {
        type: String,
        default: '/'
      },
      done: {
        type: Function
      },
      url: {
        type: String
      },
      error: {
        type: Function
      },
      valueKey: {
        type: String,
        default: 'value'
      }
    },
    mounted: function() {

      if (!this.ajax) return;

        if (typeof $=='undefined') {
         console.error('vue-form-2: missing global dependency: vf-file with ajax depends on JQuery');
         return;
       }

       if (typeof $(this.$el).fileupload=='undefined') {
         console.error('vue-form-2: missing global dependency: vf-file with ajax depends on the jQuery-File-Upload plugin');
         return;
       }

      var self = this;
      var parentOptions = this.inForm()?clone(this.getForm().options.fileOptions):{};

      var options = merge.recursive(parentOptions, this.options);

      if (this.url) options.url = this.url;
      if (!options.hasOwnProperty("formData")) options.formData = {};

      options.formData.rules = JSON.stringify(this.Rules);

      if (!options.formData.hasOwnProperty('dest')) {
        options.formData.dest = this.dest;
      }

      if (!options.hasOwnProperty('done')) {
        options.done = this.done?this.done:function(e, data) {
         self.setValue(data.result[self.valueKey]);
       }
     }

     if (!options.hasOwnProperty('error')) {
        options.error = this.error?this.error:function(e, data) {
        let text = JSON.parse(e.responseText);
        bootbox.alert(text.error.message);
      }
    }

    $(this.$el).find("input[type=file]").fileupload(options);

  }
});
}


