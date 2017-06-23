import Event from '../bus';

module.exports = function(event, payload) {
	var pieces = event.split("::");
	var eventName = pieces[0];

	if (this.vuex) {
		
		if (pieces.length>1) return;

		eventName = eventName.toUpperCase().replace('-', '_');
		this.$store.commit(`${this.name}/${eventName}`, payload);
	} else {
		pieces[0] = this.name?`${this.name}.${eventName}`:eventName;
		event = "vue-form." + pieces.join('::');

		Event.$emit(event, payload);		
	}

}