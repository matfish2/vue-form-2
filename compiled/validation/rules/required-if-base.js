"use strict";

var isTriggerOn = require('../../trigger/trigger-on');

module.exports = function (that, rule) {

    if (!that.inForm()) return true;

    var params = that.Rules[rule].split(":");
    var triggerName = params[0];
    var values = params.length > 1 ? params[1] : false;
    var trigger = that.getField(triggerName);

    var required = isTriggerOn(that, trigger, values);

    that.isRequired = required;

    return required;
};