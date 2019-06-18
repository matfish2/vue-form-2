"use strict";

var merge = require("merge");

module.exports = function () {
  if (!this.Rules.remote) return;

  var formError = {
    name: this.name,
    rule: "remote",
    show: true
  };

  var rule = this.Rules.remote;
  var url = typeof rule === "string" ? rule : rule.url;
  var params = typeof rule === "string" ? {} : rule.params;

  this.$http.get(url, { params: merge(params, { value: this.value }) }).then(function (data) {
    var i = this.vferrors.indexOf("remote");
    this.vferrors.splice(i, 1);
    if (this.inForm()) this.removeFormError(formError);
  }).catch(function (e) {
    this.messages.remote = e.body;

    if (this.vferrors.indexOf("remote") == -1) {
      this.vferrors.push("remote");
      if (this.inForm()) this.addFormError(formError, true);
    }
  });
};