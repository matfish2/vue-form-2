var requiredIfBase = require('./required-if-base');
var hasValue = require('./has-value');

module.exports = function(that) {

  var required = requiredIfBase(that,'requiredIf');
console.log(required);
  return !required || hasValue(that) || that.fieldType=='checkbox';

}
