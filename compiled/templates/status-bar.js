'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var message = this.hasMessage ? '<p>' + this.Message + '</p>' : '';

  var errors = [];

  this.showableErrors.map(function (error) {
    return errors.push(_this.getErrorMessage(error));
  });
  this.errors = this.errors.filter(function (error) {
    return error;
  });

  errors = errors.map(function (error) {
    return '<li>' + error + '</li>';
  });
  var content = this.hasErrors ? '<p>' + this.errorsCount + '</p><ul>' + errors.join('') + '</ul>' : message;
  var style = content ? '' : 'display:none;';

  return h(
    'div',
    { 'class': 'StatusBar alert alert-' + this.Status, style: style, domProps: {
        'innerHTML': content
      }
    },
    []
  );
};