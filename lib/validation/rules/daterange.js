module.exports = function(field) {

    let value = field.momentizeValue(field.curValue);

  	return value.start.isValid() && value.end.isValid() && value.end>=value.start;

}
