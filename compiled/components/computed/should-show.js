"use strict";

module.exports = function () {
  return !this.rules.requiredIf || !!this.errors.length;
};