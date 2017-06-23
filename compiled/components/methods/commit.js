"use strict";

module.exports = function (commit, payload) {
	this.$store.commit(this.formName + "/" + commit, payload);
};