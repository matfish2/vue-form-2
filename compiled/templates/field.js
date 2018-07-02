'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {

  var label = '';
  var description = '';
  var feedback = '';
  var error = '';
  var form = this.getForm();
  var rowClass = form.opts.layout == 'form-horizontal' ? 'row ' : '';

  if (this.hasLabel) {

    if (this.description) description = h(
      'small',
      { 'class': 'description' },
      [this.description]
    );

    label = h(
      'label',
      {
        'class': 'col-form-label VF-Field__label control-label ' + form.labelClass,
        attrs: { 'for': this.Name,
          title: this.title }
      },
      [h(
        'span',
        null,
        [this.label]
      ), description]
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
        id: 'Field--' + this.Name
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