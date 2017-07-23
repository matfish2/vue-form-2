'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  var _this = this;

  var toggler = '';
  var items = [];

  if (this.multiple) {
    toggler = h(
      'span',
      { 'class': 'pull-right btn btn-link',
        on: {
          'click': this.toggle.bind(this)
        }
      },
      [this.toggleText]
    );
  }

  this.items.map(function (item) {
    if (_this.passesFilter(item)) items.push(h(
      'div',
      { 'class': _this.itemClass },
      [h(
        'label',
        { 'class': 'form-check-label' },
        [h(
          'input',
          {
            'class': 'form-check-input',
            attrs: { disabled: _this.disabled,
              name: _this.name + _this.arraySymbol,
              type: _this.type,
              value: item.id,

              checked: _this.isChecked(item.id) },
            on: {
              'change': _this.updateValue.bind(_this, item.id)
            }
          },
          []
        ), h(
          'span',
          { 'class': 'form-check-label-text' },
          [item.text]
        )]
      )]
    ));
  });

  var content = items.length ? [toggler, items] : [this.getForm().opts.texts.noItems];

  return h(
    'div',
    { 'class': 'VF-Buttons__wrapper' },
    [content]
  );
};