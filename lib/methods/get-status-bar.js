module.exports = function () {
	return getStatusbar(this.$parent);
};

function getStatusbar(instance) {

	if (!instance) return {
		danger() {},
		success() {},
		info() {},
		warning() {},
		reset() {}
	};

	if (instance.$refs && instance.$refs.statusbar) return instance.$refs.statusbar;

	return getStatusbar(instance.$parent);
}