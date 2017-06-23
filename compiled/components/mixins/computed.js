'use strict';

module.exports = {
  computed: {
    fieldClasses: require('../computed/field-classes'),
    hasFeedback: require('../computed/has-feedback'),
    feedbackIcon: require('../computed/feedback-icon'),
    validationError: require('../computed/validation-error'),
    success: require('../computed/success'),
    hasLabel: require('../computed/has-label'),
    trigger: require('../computed/trigger'),
    state: function state() {
      return this.$store.state[this.formName];
    },
    formName: function formName() {
      return this.getForm().name;
    }
  }
};