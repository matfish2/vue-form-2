"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (h) {

	var nowButton = '';

	if (this.nowButton && !this.disabled) {
		nowButton = h(
			"button",
			{ "class": "btn btn-default btn-sm", attrs: { type: "button" },
				on: {
					"click": this.setNow.bind(this)
				}
			},
			[this.nowText]
		);
	}

	return h(
		"div",
		null,
		[h(
			"input",
			{ "class": "VF-Field--Date__datepicker form-control",
				attrs: { name: this.Name,
					placeholder: this.placeholder,
					value: this.formattedDate,
					disabled: this.disabled,

					type: "text" },
				on: {
					"change": this.updateValue.bind(this)
				}
			},
			[]
		), nowButton]
	);
};