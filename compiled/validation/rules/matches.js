"use strict";

module.exports = function (field) {

	var otherField = field.Rules.matches;
	var value = field.value;
	var otherValue = field.getForm().getField(otherField).value;

	return value == otherValue;
};