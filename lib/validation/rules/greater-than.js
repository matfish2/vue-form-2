module.exports = function(that) {

  var value = that.value;

  if (!value)
    return true;

  var otherField = that.getField(that.Rules.greaterThan);

  if (!otherField || !otherField.value)
    return true;
	
  var otherFieldValue = otherField.value;

  var value1 = !!isNaN(value) || typeof value=='object'?value:parseFloat(value);
  var value2 = !!isNaN(otherFieldValue) || typeof otherFieldValue=='object'?otherFieldValue:parseFloat(otherFieldValue);

  return value1 > value2;

}
