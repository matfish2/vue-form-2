"use strict";

module.exports = function () {
  var fieldClass = "VF-Field--" + ucfirst(this.fieldType);
  var str = "";

  var classes = {
    "VF-Field--required": this.required || this.Rules.required || this.isRequired,
    "VF-Field--disabled": this.disabled,
    "has-error": this.vferrors.length,
    "has-feedback": this.hasFeedback,
    "has-success": this.success
  };

  classes[fieldClass] = true;

  for (var c in classes) {
    if (classes[c]) str += " " + c;
  }

  return str;
};

function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}