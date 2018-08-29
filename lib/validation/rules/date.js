module.exports = function(field) {

		var val = field.value;

		if (!val) return true;

		return val.isValid();
}
