'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (h) {
    var _this = this;

    var message = '';

    if (this.hasMessage) {
        message = getMessage.call(this, h);
    }

    var errors = [];

    this.showableErrors.map(function (error) {
        return errors.push({ name: error.name, text: _this.getErrorMessage(error) });
    });
    errors = errors.filter(function (error) {
        return error;
    });

    errors = errors.map(function (error) {
        return h('li', [h(
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
        )]);
    });
    var content = this.hasErrors ? h('div', [h('p', [typeof this.errorsCount === 'function' ? this.errorsCount.call(this, h) : this.errorsCount]), h('ul', [errors])]) : message;
    var style = content ? '' : 'display:none;';

    return h(
        'div',
        { 'class': 'StatusBar alert alert-' + this.Status, style: style },
        [content]
    );
};

function getMessage(h) {

    var message = this.Message;
    if (typeof message === 'string') return message;
    if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {

        if (message.formatter) {
            return this.getForm().opts.messageFormatters[message.formatter](h, message.message);
        }

        return message.map(function (m) {
            if (m.name) {
                return h('li', [h(
                    'a',
                    {
                        attrs: { href: '#Field--' + m.name }
                    },
                    [m.message]
                )]);
            }

            return h('li', [m]);
        });
    }

    if (typeof message === 'function') return message(h);
}