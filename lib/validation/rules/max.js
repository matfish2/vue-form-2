module.exports = function(that) {

  var value = that.Rules.number  ||
              that.Rules.integer ||
              typeof that.Rules.max=='object'? // moment object
              that.curValue:
              that.curValue.length;

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return (value<=that.Rules.max);
}
