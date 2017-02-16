'use strict';

var _statusBar = require('../templates/status-bar');

var _statusBar2 = _interopRequireDefault(_statusBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  name: 'status-bar',
  data: function data() {
    return {
      message: '',
      status: 'success'
    };
  },
  render: _statusBar2.default,
  methods: {
    getForm: require('./methods/get-form'),
    _setMessage: function _setMessage(message, status) {
      this.message = message;
      this.status = status;
    },
    danger: function danger(message) {
      this._setMessage(message, 'danger');
    },
    success: function success(message) {
      this._setMessage(message, 'success');
    },
    info: function info(message) {
      this._setMessage(message, 'info');
    },
    warning: function warning(message) {
      this._setMessage(message, 'warning');
    },
    reset: function reset() {
      this.success('');
    },
    getErrorMessage: function getErrorMessage(error) {

      var field = this.getForm().getField(error.name);

      if (error.hasOwnProperty('message')) return error.message.replace(":field", field.label);

      return field.getMessage(error.rule);
    }
  },
  computed: {
    Message: function Message() {
      return this.message;
    },
    Status: function Status() {
      if (this.hasErrors) return 'danger';

      return this.status;
    },
    errorsCount: function errorsCount() {
      var texts = this.getForm().opts.texts;
      return this.showableErrors.length == 1 ? texts.singleError : texts.errors.replace('{0}', this.showableErrors.length);
    },
    hasErrors: function hasErrors() {
      return !this.message && this.getForm().opts.showClientErrorsInStatusBar && this.showableErrors.length;
    },
    hasMessage: function hasMessage() {
      return !!this.Message || this.hasErrors;
    },

    showableErrors: function showableErrors() {

      var errors = [];

      this.getForm().errors.forEach(function (error) {
        if (error.show) errors.push(error);
      });

      return errors;
    }
  }
};