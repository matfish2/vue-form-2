var validator = {
  between:  require('../../validation/rules/between'),
  digits:  require('../../validation/rules/digits'),
  email:  require('../../validation/rules/email'),
  greaterThan:  require('../../validation/rules/greater-than'),
  smallerThan:  require('../../validation/rules/smaller-than'),
  integer:  require('../../validation/rules/integer'),
  max:  require('../../validation/rules/max'),
  min:  require('../../validation/rules/min'),
  number:  require('../../validation/rules/number'),
  requiredIf:  require('../../validation/rules/required-if'),
  requiredAndShownIf: require('../../validation/rules/required-if-and-shown'),
  required:require('../../validation/rules/required'),
  url:  require('../../validation/rules/url'),
  date: require('../../validation/rules/date'),
  daterange: require('../../validation/rules/daterange'),
  matches: require('../../validation/rules/matches')
}

var merge = require('merge');

function shouldShow(that, rule) {
  return !that.pristine || ['greaterThan','smallerThan'].indexOf(rule)>-1;
}

module.exports = function() {

 var formError;
 var isValid;

 validator = merge.recursive(validator, this.getForm().opts.customRules);

 for (var rule in this.Rules) {

  if (validator[rule]) {

   isValid = (!this.curValue && rule!='required' && rule!='requiredIf' && rule!='requiredAndShownIf') || validator[rule](this);

   formError = {
    name:this.name,
    rule:rule,
    show:shouldShow(this, rule)
  };

  if (isValid) {
    this.errors = this.errors.filter(function(r) {
      return r!=rule;
    })

    if (this.inForm()) this.removeFormError(formError);

  } else {

    if (shouldShow(this, rule))  {
      if (this.errors.indexOf(rule)==-1)
        this.errors.push(rule);
    }
    if (this.inForm())  {
      this.addFormError(formError,!this.pristine, rule);
    }
  }

}

}

if (this.errors.length) this.hadErrors = true;
}
