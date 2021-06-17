var merge = require("merge");

module.exports = function() {
  var data = {};
  var value;
  var nullifyEmptyStrings = this.opts.nullifyEmptyStrings;
  var momentServerFormat = this.opts.momentServerFormat;

  if (this.vuex) {
    data = this.$store.state[this.name].values;
  } else {
    this.vffields.forEach(function(field) {
      value = getValue(field.value, nullifyEmptyStrings, momentServerFormat, field.timepicker);
      data[field.name] = value;
    });
  }

  data = merge.recursive(data, this.getOptions().additionalPayload);

  return data;
};

function isValidMomentObject(value) {
  return typeof value == "object" && value.isValid && value.isValid();
}

function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}

function getValue(value, nullifyEmptyStrings, momentServerFormat, isTimepicker) {
  if (typeof value === "string" && value.trim() === "" && nullifyEmptyStrings) {
    return null;
  }

  if (!value || typeof value != "object" || isArray(value)) return value;

  if (isValidMomentObject(value)) return value.format(isTimepicker ? null : momentServerFormat);

  if (
    typeof value == "object" &&
    value.start &&
    isValidMomentObject(value.start) &&
    value.end &&
    isValidMomentObject(value.end)
  ) {
    return {
      start: value.start.format(),
      end: value.end.format()
    };
  }

  return value;
}
