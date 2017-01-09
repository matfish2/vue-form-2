module.exports =  function(field) {

	let otherField = field.Rules.matches;
	let value = field.getValue();
	let otherValue = field.getForm().getField(otherField).getValue();

	return value==otherValue;
}