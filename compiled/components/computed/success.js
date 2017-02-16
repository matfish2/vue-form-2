"use strict";

module.exports = function () {
    return this.hadErrors && !this.errors.length;
};