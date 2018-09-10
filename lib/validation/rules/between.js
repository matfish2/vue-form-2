module.exports = function(that) {

  var val = that.value;

  var value = ['email','password','text','textarea'].indexOf(that.fieldType)>-1?
              val.length:
              val;

  if (that.Rules.number || that.Rules.integer) value = parseFloat(value);

  return (value>=that.Rules.between[0] && value<=that.Rules.between[1]);
}
