module.exports =  function(field) {

	let otherField = field.Rules.matches;
	let value = field.value;
	let otherValue = field.getForm().getField(otherField).value;

	return value==otherValue;
}
