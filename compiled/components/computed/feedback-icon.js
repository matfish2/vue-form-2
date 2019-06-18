"use strict";

module.exports = function () {
  if (this.vferrors.length) return "remove";
  if (this.success) return "ok";
  return "";
};