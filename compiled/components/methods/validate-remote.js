"use strict";

module.exports = function () {

    if (!this.Rules.remote) return;

    var formError = {
        name: this.name,
        rule: "remote",
        show: true
    };

    this.$http.get(this.Rules.remote, { value: this.value }).then(function (data) {
        var i = this.errors.indexOf("remote");
        this.errors.splice(i, 1);
        if (this.inForm()) this.removeFormError(formError);
    }).catch(function (e) {
        this.messages.remote = e.body;

        if (this.errors.indexOf("remote") == -1) {
            this.errors.push("remote");
            if (this.inForm()) this.addFormError(formError, true);
        }
    });
};