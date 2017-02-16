"use strict";

module.exports = function () {
    return this.errors.length || this.success;
};