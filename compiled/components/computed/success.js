"use strict";

module.exports = function () {
  return this.hadErrors && !this.vferrors.length;
};