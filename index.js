import merge from 'merge'
import formTemplate from './lib/templates/form.jsx'
import opts from './lib/computed/opts'
import statusBar from './lib/components/status-bar'
import submit from './lib/components/submit'
import text from './lib/components/fields/text'
import password from './lib/components/fields/password'
import fields from './lib/templates/fields'

exports.install = function(Vue, globalOptions, customFields) {

  customFields = customFields?customFields:{};

  var vfForm = {
    render: formTemplate,
    props: {
      client:{
        type:Boolean,
        required:false,
        default: false
      },
      ajax: {
        type: Boolean,
        required: false,
        default: false
      },
      action: {
        type: String
      },
      method: {
        type: String,
        required:false,
        default: 'POST'
      },
      validation: {
        type: Object,
        required:false,
        default: function() {
          return {
          }
        }
      },
      triggers:{
        type: Object,
        required:false,
        default: function() {
          return {
          }
        }
      },
      options:{
        type: Object,
        required:false,
        default: function() {
          return {
          }
        }
      }
    },

    created: function() {

      if (!this.ajax && !this.client) {
        var payload = this.options.additionalPayload;
        for (var key in payload) {
          this.additionalValues.push({name:key,value:payload[key]});
        }
      }

      this.registerInterfieldsRules();
      this.registerTriggers();

    },
    data: function() {
      return {
        globalOptions: globalOptions?globalOptions:{},
        templates: merge.recursive(fields, customFields),
        isForm: true,
        fields:[],
        additionalValues:[],
        errors:[],
        relatedFields:{},
        triggeredFields:{},
        sending:false
      }
    },
    computed: {
      labelClass:require('./lib/computed/label-class'),
      fieldClass:require('./lib/computed/field-class'),
      hasErrors: require('./lib/computed/has-errors'),
      server: () => {
        return !this.ajax && !this.client;
      },
      opts,
      pristine: function() {
        return this.fields.length==0;
      }
    },
    methods: {
      submit:require('./lib/methods/submit'),
      formData:require('./lib/methods/form-data'),
      getField:require('./lib/methods/get-field'),
      showAllErrors:require('./lib/methods/show-all-errors'),
      reinitForm:require('./lib/methods/reinit-form'),
      registerInterfieldsRules: require('./lib/methods/register-interfields-rules'),
      registerTriggers: require('./lib/methods/register-triggers'),
      childrenOf: require('./lib/methods/children-of'),
      getStatusBar: require('./lib/methods/get-status-bar')
    }

  }

  Vue.component('vf-form',vfForm);

  Vue.component('vf-text',text());
  Vue.component('vf-email',require('./lib/components/fields/email')());
  Vue.component('vf-number',require('./lib/components/fields/number')());
  Vue.component('vf-password',password());
  Vue.component('vf-file',require('./lib/components/fields/file')());
  Vue.component('vf-textarea',require('./lib/components/fields/textarea')());
  Vue.component('vf-select',require('./lib/components/fields/select')());
  Vue.component('vf-buttons-list',require('./lib/components/fields/buttons-list')());
  Vue.component('vf-date',require('./lib/components/fields/date')());
  Vue.component('vf-checkbox',require('./lib/components/fields/checkbox')());

  Vue.component('vf-status-bar', statusBar);
  Vue.component('vf-submit',submit);


}


