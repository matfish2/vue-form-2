module.exports = function () {
	return this.$children.find(child=>child.$options.name==='status-bar');
}
