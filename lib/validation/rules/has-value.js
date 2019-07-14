var isNumeric = require("../../helpers/is-numeric");

module.exports = function(that) {
  var value = that.value;

  return !!(
    (value || value === 0 || value === "0") &&
    (isString(value) ||
      [
        "checkbox",
        "date",
        "partialdate",
        "monthyear",
        "pikaday",
        "addressfinder",
        "loqate"
      ].includes(that.fieldType) ||
      isMultipleList(that, value) ||
      isNumeric(value))
  );
};

function isMultipleList(that, value) {
  return (
    (that.fieldType == "select" || that.fieldType == "buttons") &&
    that.multiple &&
    value.length > 0
  );
}

function isString(value) {
  return typeof value == "string" && value.trim().length > 0;
}
