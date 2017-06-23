module.exports = function() {
	
	var name = this.name;

	if (typeof this.$store.state[name] !== 'undefined') {
		this.$store.unregisterModule(name);
	}

	this.$store.registerModule(name, {
		state: {
			count:0,
			values:{}
		},
		mutations: {
			[`${name}/CHANGE`](state, payload) {
				state.values[payload.name] = payload.value;
				state.count++;
			},
			[`${name}/SENDING`](state, payload) {

			},
			[`${name}/SENT`](state, payload) {
				state.values = {};
				state.count = 0;
			},
			[`${name}/INVALID.SERVER`](state, payload) {

			},
			[`${name}/INVALID.CLIENT`](state, payload) {

			}			
		}
	});
}