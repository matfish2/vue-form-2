module.exports = function(field) {

		if (!field.curValue) return true;

		return field.curValue.isValid();
}
