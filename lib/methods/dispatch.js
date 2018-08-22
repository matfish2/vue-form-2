import Event from '../bus';

module.exports = function(event, payload) {
	var pieces = event.split("::");
	var eventName = pieces[0];

  this.$emit(eventName, payload);

	// Trigger Vuex commit
	if (this.vuex && pieces.length===1) {
		var EventName = eventName.toUpperCase().replace(/-/g, '_');
		this.$store.commit(`${this.name}/${EventName}`, payload);
	} 

	// Fire global event
	event = "vue-form." + pieces.join('::');
	Event.$emit(event, payload);		
	// Fire Component Specific event 

	if (this.name) {
		pieces[0] = `${this.name}.${eventName}`;
		event = "vue-form." + pieces.join('::');	
		Event.$emit(event, payload);		
	}

	

}
