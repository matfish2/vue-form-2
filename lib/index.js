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
      vuex:Boolean,
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

      if (this.vuex && !this.name) {
          throw new Error('You must declare the "name" prop when using vuex');
      }

      if (!this.ajax && !this.client) {
        var payload = this.options.additionalPayload;
        for (var key in payload) {
          this.additionalValues.push({name:key,value:payload[key]});
        }
      }

      this.registerInterfieldsRules();
      this.registerTriggers();

      if (this.vuex)
        this.registerModule();

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
      labelClass:require('./computed/label-class'),
      hasErrors: require('./computed/has-errors'),
      server: () => {
        return !this.ajax && !this.client;
      },
      opts
    },
    methods: {
      fieldClass:require('./methods/field-class'),
      submit:require('./methods/submit'),
      formData:require('./methods/form-data'),
      getField:require('./methods/get-field'),
      showAllErrors:require('./methods/show-all-errors'),
      reinitForm:require('./methods/reinit-form'),
      registerInterfieldsRules: require('./methods/register-interfields-rules'),
      registerTriggers: require('./methods/register-triggers'),
      childrenOf: require('./methods/children-of'),
      getStatusBar: require('./methods/get-status-bar'),
      dispatch: require('./methods/dispatch'),
      getOptions: opts,
      registerModule: require('./methods/register-module'),
      pristine: function() {
        return this.vuex?this.$store.state[this.name].count === 0:this.fields.length === 0;
      }
    }

  }

  Vue.component('vf-form',vfForm);

  Vue.component('vf-text',text());
  Vue.component('vf-email',require('./components/fields/email')());
  Vue.component('vf-color',require('./components/fields/color')());
  Vue.component('vf-number',require('./components/fields/number')());
  Vue.component('vf-password',password());
  Vue.component('vf-file',require('./components/fields/file')(globalOptions.fileOptions));
  Vue.component('vf-textarea',require('./components/fields/textarea')());
  Vue.component('vf-select',require('./components/fields/select')());
  Vue.component('vf-buttons-list',require('./components/fields/buttons-list')());
  Vue.component('vf-date',require('./components/fields/date')());
  Vue.component('vf-checkbox',require('./components/fields/checkbox')());

  Vue.component('vf-status-bar', statusBar);
  Vue.component('vf-submit',submit);


}


