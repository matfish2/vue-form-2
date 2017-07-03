'use strict';

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _form = require('./templates/form');

var _form2 = _interopRequireDefault(_form);

var _opts = require('./computed/opts');

var _opts2 = _interopRequireDefault(_opts);

var _statusBar = require('./components/status-bar');

var _statusBar2 = _interopRequireDefault(_statusBar);

var _submit = require('./components/submit');

var _submit2 = _interopRequireDefault(_submit);

var _text = require('./components/fields/text');

var _text2 = _interopRequireDefault(_text);

var _password = require('./components/fields/password');

var _password2 = _interopRequireDefault(_password);

var _fields = require('./templates/fields');

var _fields2 = _interopRequireDefault(_fields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.install = function (Vue, globalOptions, customFields) {
  var _this = this;

  customFields = customFields ? customFields : {};

  var vfForm = {
    render: _form2.default,
    props: {
      vuex: Boolean,
      name: {
        type: String,
        required: false
      },
      client: {
        type: Boolean,
        required: false,
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
        required: false,
        default: 'POST'
      },
      validation: {
        type: Object,
        required: false,
        default: function _default() {
          return {};
        }
      },
      triggers: {
        type: Object,
        required: false,
        default: function _default() {
          return {};
        }
      },
      options: {
        type: Object,
        required: false,
        default: function _default() {
          return {};
        }
      }
    },

    created: function created() {

      if (this.vuex && !this.name) {
        throw new Error('You must declare the "name" prop when using vuex');
      }

      if (!this.ajax && !this.client) {
        var payload = this.options.additionalPayload;
        for (var key in payload) {
          this.additionalValues.push({ name: key, value: payload[key] });
        }
      }

      this.registerInterfieldsRules();
      this.registerTriggers();

      if (this.vuex) this.registerModule();
    },
    data: function data() {
      return {
        globalOptions: globalOptions ? globalOptions : {},
        templates: _merge2.default.recursive(_fields2.default, customFields),
        isForm: true,
        fields: [],
        additionalValues: [],
        errors: [],
        relatedFields: {},
        triggeredFields: {},
        sending: false
      };
    },
    computed: {
      labelClass: require('./computed/label-class'),
      hasErrors: require('./computed/has-errors'),
      server: function server() {
        return !_this.ajax && !_this.client;
      },
      opts: _opts2.default
    },
    methods: {
      fieldClass: require('./methods/field-class'),
      submit: require('./methods/submit'),
      formData: require('./methods/form-data'),
      getField: require('./methods/get-field'),
      showAllErrors: require('./methods/show-all-errors'),
      reinitForm: require('./methods/reinit-form'),
      registerInterfieldsRules: require('./methods/register-interfields-rules'),
      registerTriggers: require('./methods/register-triggers'),
      childrenOf: require('./methods/children-of'),
      getStatusBar: require('./methods/get-status-bar'),
      dispatch: require('./methods/dispatch'),
      getOptions: _opts2.default,
      registerModule: require('./methods/register-module'),
      pristine: function pristine() {
        return this.vuex ? this.$store.state[this.name].count === 0 : this.fields.length === 0;
      }
    }

  };

  Vue.component('vf-form', vfForm);

  Vue.component('vf-text', (0, _text2.default)());
  Vue.component('vf-email', require('./components/fields/email')());
  Vue.component('vf-color', require('./components/fields/color')());
  Vue.component('vf-number', require('./components/fields/number')());
  Vue.component('vf-password', (0, _password2.default)());
  Vue.component('vf-file', require('./components/fields/file')());
  Vue.component('vf-textarea', require('./components/fields/textarea')());
  Vue.component('vf-select', require('./components/fields/select')());
  Vue.component('vf-buttons-list', require('./components/fields/buttons-list')());
  Vue.component('vf-date', require('./components/fields/date')());
  Vue.component('vf-checkbox', require('./components/fields/checkbox')());

  Vue.component('vf-status-bar', _statusBar2.default);
  Vue.component('vf-submit', _submit2.default);
};