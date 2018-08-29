module.exports = function(that) {

  var val = that.value;

  if (!val)
    return true;

  var otherField = that.getField(that.Rules.smallerThan);

  if (!otherField || !otherField.value)
    return true;
	
   var otherFieldValue = otherField.value;

   var value1 = !!isNaN(val) || typeof val=='object'?val:parseFloat(val);
   var value2 = !!isNaN(otherFieldValue) || typeof otherFieldValue=='object'?otherFieldValue:parseFloat(otherFieldValue);

  return value1 < value2;
}
