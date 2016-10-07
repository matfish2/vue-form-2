var requiredIfBase = require('./required-if-base');
var hasValue = require('./has-value');

module.exports = function(that) {

  var required = requiredIfBase(that,'requiredAndShownIf');

  that.shouldShow = required;

  return !required || hasValue(that) || that.fieldType=='checkbox';

}
