'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (h) {

    var hiddenInput = '';

    if (this.inForm() && this.getForm().server) {
        hiddenInput = h(
            'input',
            {
                attrs: { type: 'hidden', name: this.name, value: this.serverFormat }
            },
            []
        );
    }

    return h(
        'div',
        { 'class': 'date-wrapper VF-Field--Date__datepicker' },
        [h(
            'i',
            { 'class': 'glyphicon glyphicon-calendar' },
            []
        ), h(
            'span',
            { 'class': 'VF-Field--Date__date' },
            [this.formattedDate]
        ), h(
            'b',
            { 'class': 'caret' },
            []
        ), hiddenInput]
    );
};