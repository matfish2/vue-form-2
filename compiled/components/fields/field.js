'use strict';

var _field = require('../../templates/field');

var _field2 = _interopRequireDefault(_field);

var _watch = require('../mixins/watch');

var _watch2 = _interopRequireDefault(_watch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var mounted = require('../mixins/mounted');


module.exports = function () {
	return {
		render: _field2.default,
		mixins: [props, data, methods, computed, mounted, _watch2.default],
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