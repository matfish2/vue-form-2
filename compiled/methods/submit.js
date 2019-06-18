"use strict";

var getSubmitter = require("./get-submitter");

module.exports = function (e) {
  var _this = this;

  if (e) e.preventDefault();

  this.vferrors = this.vferrors.filter(function (error) {
    var field = _this.getField(error.name);
    return field && !field.isHidden();
  });

  if (this.vferrors.length > 0) {
    return handleErrors(this);
  }

  if (this.sending || this.opts.sendOnlyDirtyFields && this.pristine()) {
    return false;
  }

  var beforeSubmit = this.opts.beforeSubmit(this);

  if (typeof beforeSubmit === "boolean" && beforeSubmit) return getSubmitter(this).submit(e);

  var resolveMethod = beforeSubmit.done ? "done" : "then";
  var rejectMethod = beforeSubmit.catch ? "catch" : "fail";

  beforeSubmit[resolveMethod](function () {
    return getSubmitter(this).submit(e);
  }.bind(this))[rejectMethod](function () {});
};

function handleErrors(vm) {
  vm.showAllErrors();
  vm.dispatch("invalid.client", vm.vferrors);
  return false;
}