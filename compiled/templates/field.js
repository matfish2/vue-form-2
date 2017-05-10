'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {

  var label = '';
  var feedback = '';
  var error = '';
  var form = this.getForm();
  var rowClass = form.opts.layout == 'form-horizontal' ? 'row ' : '';

  if (this.hasLabel) {
    label = h(
      'label',
      {
        'class': 'col-form-label VF-Field__label control-label ' + form.labelClass,
        attrs: { 'for': this.name,
          title: this.title }
      },
      [this.label]
    );
  }

  if (this.validationError) {
    error = h(
      'span',
      { 'class': 'VF-ValidationError\r help-block' },
      [this.validationError]
    );
  }

  if (this.hasFeedback) {
    feedback = h(
      'span',
      { 'class': "glyphicon glyphicon-" + this.feedbackIcon + " form-control-feedback",
        attrs: { 'aria-hidden': 'true' }
      },
      []
    );
  }

  return h(
    'div',
    {
      directives: [{
        name: 'show',
        value: this.shouldShow
      }],
      attrs: {
        id: 'Field--' + this.name
      },
      'class': 'VF VF-Field form-group ' + rowClass + this.fieldClasses
    },
    [label, h(
      'div',
      { 'class': "VF-Field__wrapper" + this.hasLabel ? form.fieldClass(!this.hideLabel) : '' },
      [this.$slots.before, form.templates[this.fieldType].apply(this, [h]), feedback, error, this.$slots.after]
    )]
  );
};

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }