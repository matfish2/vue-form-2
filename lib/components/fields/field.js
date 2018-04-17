var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var mounted = require('../mixins/mounted');
import field from '../../templates/field'

module.exports = function() {
	return {
		render: field,
		mixins:[props,data, methods, computed, mounted],
		methods: {
			setValue: function(value, setDirty = true) {
				this.saveValue(value);
				if (setDirty) this.dirty = true;			
			},
			updateValue: function(e) {
				this.saveValue(e.target.value);
			},
			saveValue(value) {
				this.curValue = value;
			},
			getValue: function() {
				return this.vuex?this.state[this.name]:this.curValue;
			},
			reset: function() {
				this.wasReset = true;
				this.curValue = '';
			},
			focus: function() {
				this.$el.getElementsByTagName(this.tagName)[0].focus();
			}
		},
		destroyed: function() {
			const form = this.getForm();
			form.errors = form.errors.filter(error => error.name != this.name);
		}
	}
}
