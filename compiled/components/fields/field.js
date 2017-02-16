'use strict';

var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var mounted = require('../mixins/mounted');
var field = require('../../templates/field');
var watch = require('../mixins/watch');

module.exports = function () {
	return {
		render: field,
		mixins: [props, data, methods, computed, mounted, watch],
		methods: {
			setValue: function setValue(value) {
				this.curValue = value;
				this.dirty = true;
			},
			updateValue: function updateValue(e) {
				this.curValue = e.target.value;
			},
			getValue: function getValue() {
				return this.curValue;
			},
			reset: function reset() {
				this.wasReset = true;
				this.curValue = '';
			},
			focus: function focus() {
				this.$el.getElementsByTagName(this.tagName)[0].focus();
			}
		}
	};
};