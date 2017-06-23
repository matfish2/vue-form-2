module.exports = function(that) {

  var val = that.getValue();

  var value = that.Rules.number ||
              that.Rules.integer||
               typeof that.Rules.between[0]=='object'? // moment objects
               val:
               val.length;

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return (value>=that.Rules.between[0] && value<=that.Rules.between[1]);
}
