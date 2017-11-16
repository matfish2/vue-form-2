'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (h) {

	var hiddenInput = '';
	var nowButton = '';

	if (this.inForm() && this.getForm().server) {
		hiddenInput = h(
			'input',
			{
				attrs: { type: 'hidden', name: this.name },
				domProps: {
					'value': this.serverFormat
				}
			},
			[]
		);
	}

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

	return h(
		'div',
		null,
		[h(
			'input',
			{ 'class': 'VF-Field--Date__datepicker form-control',
				attrs: { name: this.name,
					placeholder: this.placeholder,

					disabled: this.disabled,

					type: 'text' },
				domProps: {
					'value': this.formattedDate
				},
				on: {
					'change': this.updateValue.bind(this)
				}
			},
			[]
		), nowButton, hiddenInput]
	);
};