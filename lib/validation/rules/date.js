module.exports = function(field) {

		var val = field.getValue();

		if (!val) return true;

		return val.isValid();
}
