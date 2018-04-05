'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var message = this.hasMessage ? h(
    'p',
    null,
    [this.Message]
  ) : '';

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