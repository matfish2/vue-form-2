import Event from '../../bus';

module.exports = function(event, payload) {
	var pieces = event.split("::");
	var eventName = pieces[0];
	pieces[0] = this.name?`${this.name}.${eventName}`:eventName;
	event = "vue-form." + pieces.join('::');

	Event.$emit(event, payload);
}