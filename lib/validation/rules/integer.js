module.exports = function(that) {
	var value = that.getValue();
	return !isNaN(value) && value%1===0;
}
