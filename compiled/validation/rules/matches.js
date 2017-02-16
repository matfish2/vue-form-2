"use strict";

module.exports = function (field) {

	var otherField = field.Rules.matches;
	var value = field.getValue();
	var otherValue = field.getForm().getField(otherField).getValue();

	return value == otherValue;
};