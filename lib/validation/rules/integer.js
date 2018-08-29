module.exports = function(that) {
	var value = that.value;
	return !isNaN(value) && value%1===0;
}
