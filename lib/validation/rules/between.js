module.exports = function(that) {

  var value = that.Rules.number ||
              that.Rules.integer||
               typeof that.Rules.between[0]=='object'? // moment objects
               that.curValue:
               that.curValue.length;

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return (value>=that.Rules.between[0] && value<=that.Rules.between[1]);
}
