"use strict";

var _statusBar = require("../templates/status-bar");

var _statusBar2 = _interopRequireDefault(_statusBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  name: "status-bar",
  data: function data() {
    return {
      message: "",
      status: "success"
    };
  },
  render: _statusBar2.default,
  methods: {
    getForm: require("./methods/get-form"),
    _setMessage: function _setMessage(message, status) {
      this.message = message;
      this.status = status;
    },
    danger: function danger(message) {
      this._setMessage(message, "danger");
    },
    success: function success(message) {
      this._setMessage(message, "success");
    },
    info: function info(message) {
      this._setMessage(message, "info");
    },
    warning: function warning(message) {
      this._setMessage(message, "warning");
    },
    reset: function reset() {
      this.success("");
    },
    getErrorMessage: function getErrorMessage(error) {
      var field = this.form.getField(error.name);

      if (!field) return false;

      if (error.hasOwnProperty("message")) return error.message.replace(":field", field.label);

      return field.getMessage(error.rule);
    }
  },
  created: function created() {
    this.form = this.getForm();
  },

  computed: {
    Message: function Message() {
      return this.message;
    },
    Status: function Status() {
      if (this.hasErrors) return "danger";

      return this.status;
    },
    errorsCount: function errorsCount() {
      var texts = this.form.opts.texts;

      var multipleErrors = this.showableErrors.length > 1;
      var text = multipleErrors ? texts.vferrors : texts.singleError;
      if (multipleErrors && typeof text === "string") {
        text = text.replace("{0}", this.showableErrors.length);
      }

      return text;
    },
    hasErrors: function hasErrors() {
      return (!this.message || typeof this.message !== "string") && this.form.opts.showClientErrorsInStatusBar && this.showableErrors.length;
    },
    hasMessage: function hasMessage() {
      return !!this.Message || this.hasErrors;
    },

    showableErrors: function showableErrors() {
      return this.form.vferrors.filter(function (error) {
        return error.show;
      });
    }
  }
};