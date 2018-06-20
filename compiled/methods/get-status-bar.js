'use strict';

module.exports = function () {
	return this.$children.find(function (child) {
		return child.$options.name === 'status-bar';
	});
};