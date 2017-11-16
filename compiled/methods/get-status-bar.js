"use strict";

module.exports = function () {
	return getStatusbar(this.$parent);
};

function getStatusbar(instance) {

	if (!instance) return {
		danger: function danger() {},
		success: function success() {},
		info: function info() {},
		warning: function warning() {},
		reset: function reset() {}
	};

	if (instance.$refs && instance.$refs.statusbar) return instance.$refs.statusbar;

	return getStatusbar(instance.$parent);
}