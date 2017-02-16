import merge from 'merge'
import formTemplate from './templates/form'
import opts from './computed/opts'
import statusBar from './components/status-bar'
import submit from './components/submit'
import text from './components/fields/text'
import password from './components/fields/password'
import fields from './templates/fields'

exports.install = function(Vue, globalOptions, customFields) {

  customFields = customFields?customFields:{};

  var vfForm = {
    render: formTemplate,
    props: {
      name:{
        type:String,
        required:false
      },
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
      labelClass:require('./compiled/computed/label-class'),
      fieldClass:require('./compiled/computed/field-class'),
      hasErrors: require('./compiled/computed/has-errors'),
      server: () => {
        return !this.ajax && !this.client;
      },
      opts,
      pristine: function() {
        return this.fields.length==0;
      }
    },
    methods: {
      submit:require('./compiled/methods/submit'),
      formData:require('./compiled/methods/form-data'),
      getField:require('./compiled/methods/get-field'),
      showAllErrors:require('./compiled/methods/show-all-errors'),
      reinitForm:require('./compiled/methods/reinit-form'),
      registerInterfieldsRules: require('./compiled/methods/register-interfields-rules'),
      registerTriggers: require('./compiled/methods/register-triggers'),
      childrenOf: require('./compiled/methods/children-of'),
      getStatusBar: require('./compiled/methods/get-status-bar'),
      dispatch: require('./compiled/methods/dispatch'),
      getOptions: opts
    }

  }

  Vue.component('vf-form',vfForm);

  Vue.component('vf-text',text());
  Vue.component('vf-email',require('./compiled/components/fields/email')());
  Vue.component('vf-number',require('./compiled/components/fields/number')());
  Vue.component('vf-password',password());
  Vue.component('vf-file',require('./compiled/components/fields/file')());
  Vue.component('vf-textarea',require('./compiled/components/fields/textarea')());
  Vue.component('vf-select',require('./compiled/components/fields/select')());
  Vue.component('vf-buttons-list',require('./compiled/components/fields/buttons-list')());
  Vue.component('vf-date',require('./compiled/components/fields/date')());
  Vue.component('vf-checkbox',require('./compiled/components/fields/checkbox')());

  Vue.component('vf-status-bar', statusBar);
  Vue.component('vf-submit',submit);


}


