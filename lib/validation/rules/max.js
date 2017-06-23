module.exports = function(that) {

  var val = that.getValue();
  
  var value = that.Rules.number  ||
              that.Rules.integer ||
              typeof that.Rules.max=='object'? // moment object
              val:
              val.length;

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return (value<=that.Rules.max);
}
