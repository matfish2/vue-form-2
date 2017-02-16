"use strict";

module.exports = function (name) {
    if (this.$parent.$refs.hasOwnProperty(name)) return this.$parent.$refs[name];

    return this.getForm().getField(name);
};