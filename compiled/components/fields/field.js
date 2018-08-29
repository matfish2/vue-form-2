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
			updateValue: function updateValue(e) {
				this.$emit('input', e.target.value);
			},
			focus: function focus() {
				this.$el.getElementsByTagName(this.tagName)[0].focus();
			}
		},
		destroyed: function destroyed() {
			var _this = this;

			var form = this.getForm();
			form.errors = form.errors.filter(function (error) {
				return error.name != _this.name;
			});
		}
	};
};