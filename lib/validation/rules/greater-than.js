module.exports = function(that) {

  if (!that.curValue)
    return true;

  var otherField = that.getField(that.Rules.greaterThan);

  if (!otherField || !otherField.curValue)
    return true;

  var value1 = !!isNaN(that.curValue) || typeof that.curValue=='object'?that.curValue:parseFloat(that.curValue);
  var value2 = !!isNaN(otherField.curValue) || typeof otherField.curValue=='object'?otherField.curValue:parseFloat(otherField.curValue);

  return value1 > value2;

}
