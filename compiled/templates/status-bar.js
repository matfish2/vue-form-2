'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (h) {
    var _this = this;

    var message = '';

    if (this.hasMessage) {
        message = getMessage(this.Message, h);
    }

    var errors = [];

    this.showableErrors.map(function (error) {
        return errors.push({ name: error.name, text: _this.getErrorMessage(error) });
    });
    errors = errors.filter(function (error) {
        return error;
    });

    errors = errors.map(function (error) {
        return h(
            'li',
            null,
            [h(
                'a',
                {
                    on: {
                        'click': function click() {
                            _this.getForm().dispatch('error-clicked', error.name);
                        }
                    },
                    attrs: { href: '#Field--' + error.name }
                },
                [error.text]
            )]
        );
    });
    var content = this.hasErrors ? h(
        'div',
        null,
        [h(
            'p',
            null,
            [typeof this.errorsCount === 'function' ? this.errorsCount.call(this, h) : this.errorsCount]
        ), h(
            'ul',
            null,
            [errors]
        )]
    ) : message;
    var style = content ? '' : 'display:none;';

    return h(
        'div',
        { 'class': 'StatusBar alert alert-' + this.Status, style: style },
        [content]
    );
};

function getMessage(message, h) {
    if (typeof message === 'string') return message;
    if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') return message.map(function (m) {
        return h(
            'li',
            null,
            [h(
                'a',
                {
                    attrs: { href: '#Field--' + m.name }
                },
                [m.message]
            )]
        );
    });

    if (typeof message === 'function') return message(h);
}