'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
  computed: {
    fieldClasses: require('../computed/field-classes'),
    hasFeedback: require('../computed/has-feedback'),
    feedbackIcon: require('../computed/feedback-icon'),
    validationError: require('../computed/validation-error'),
    success: require('../computed/success'),
    hasLabel: require('../computed/has-label'),
    trigger: require('../computed/trigger'),
    Name: function Name() {
      return this.name ? this.name : 'noname_' + this.randomId;
    },

    state: function state() {
      return this.$store ? this.$store.state[this.formName] : false;
    },
    formName: function formName() {
      return this.getForm().name;
    },
    dirty: function dirty() {
      return this.initialValue !== this.value && _typeof(this.value) !== 'object';
    }
  }
};