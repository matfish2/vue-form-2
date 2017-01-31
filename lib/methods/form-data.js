var merge = require('merge');

module.exports = function() {
  var data = {};
  var value;

  this.fields.forEach(function(field) {
    value = getValue(field.curValue);
      data[field.name] = value;
  });

  data = merge.recursive(data,this.getOptions().additionalPayload);

  return data;
}

function isValidMomentObject(value) {
    return typeof value=='object' && value.isValid && value.isValid();
}

function isArray(value) {
  return Object.prototype.toString.call( value ) === '[object Array]';
}

function getValue(value) {

  if (!value || typeof value!='object' || isArray(value))
    return value;

  if (isValidMomentObject(value))
    return value.format();

  if (typeof value=='object' && value.start && isValidMomentObject(value.start) && value.end && isValidMomentObject(value.end)) {
      return {
        start: value.start.format(),
        end: value.end.format()
      };

  }

}
