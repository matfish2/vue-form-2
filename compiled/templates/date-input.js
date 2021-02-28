'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (h) {
	var _this = this;

	var nowButton = '';
	var clearButton = '';

	if (this.nowButton && !this.disabled) {
		nowButton = h(
			'button',
			{ 'class': 'btn btn-default btn-sm', attrs: { type: 'button' },
				on: {
					'click': this.setNow.bind(this)
				}
			},
			[this.nowText]
		);
	}

	if (this.clearButton && this.value && !this.disabled) {
		clearButton = h(
			'button',
			{ 'class': 'btn btn-default btn-sm', attrs: { type: 'button' },
				on: {
					'click': this.clear.bind(this)
				}
			},
			[this.clearLabel]
		);
	}

	return h(
		'div',
		null,
		[h(
			'input',
			{ 'class': 'VF-Field--Date__datepicker form-control',
				attrs: { name: this.Name,
					placeholder: this.placeholder,
					value: this.formattedDate,
					disabled: this.disabled,

					type: 'text' },
				on: {
					'change': function change(e) {
						return _this.$emit('input', _this.value);
					}
				}
			},
			[]
		), nowButton, clearButton]
	);
};