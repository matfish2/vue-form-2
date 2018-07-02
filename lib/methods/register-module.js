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
				state.values[payload.name] = getValue(payload.value);
				state.count = getCount(state.values);
			},
			[`${name}/RESET`](state, {name}) {
				delete state.values[name];
				state.count = getCount(state.values);
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

			},
			[`${name}/ERROR_CLICKED`](state, payload) {

			}						
		}
	});
}

function getValue(val) {

	if (val && typeof val.format==='function') {
		return val.format('YYYY-MM-DD HH:mm:ss');
	}

	return val;
}

function getCount(values) {
	
	var c = 0;
	
	for (var v in values) {
		c++;
	}

	return c;
}