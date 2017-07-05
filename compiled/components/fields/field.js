'use strict';

var _field = require('../../templates/field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var mounted = require('../mixins/mounted');


module.exports = function () {
	return {
		render: _field2.default,
		mixins: [props, data, methods, computed, mounted],
		methods: {
			setValue: function setValue(value) {
				var setDirty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				this.saveValue(value);
				if (setDirty) this.dirty = true;
			},
			updateValue: function updateValue(e) {
				this.saveValue(e.target.value);
			},
			saveValue: function saveValue(value) {
				this.curValue = value;
			},

			getValue: function getValue() {
				return this.vuex ? this.state[this.name] : this.curValue;
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