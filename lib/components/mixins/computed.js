module.exports = {
  computed: {
  fieldClasses:require('../computed/field-classes'),
  hasFeedback:require('../computed/has-feedback'),
  feedbackIcon:require('../computed/feedback-icon'),
  validationError:require('../computed/validation-error'),
  success:require('../computed/success'),
  hasLabel:require('../computed/has-label'),
  trigger: require('../computed/trigger'),
  Name() {
    return this.name?this.name:'noname_' + this.randomId;
  },
  state: function() {
  	return this.$store?this.$store.state[this.formName]:false;
  },
  formName: function() {
  	return this.getForm().name;
  },
  dirty() {
    return this.initialValue!==this.value && typeof this.value!=='object';
  }
  }
}
