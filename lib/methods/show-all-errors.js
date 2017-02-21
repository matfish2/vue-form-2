module.exports = function() {

	var errors = [];

	this.errors.forEach(function(error) {
		var field = this.getField(error.name);
		
		if (field) {
			if (field.errors.indexOf(error.rule)==-1) {
				field.errors.push(error.rule);
				field.hadErrors = true;
			}
			error.show = true;
			errors.push(error);		
		}
		
	}.bind(this));

	this.errors = errors;
}
