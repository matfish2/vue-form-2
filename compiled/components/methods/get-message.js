'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (rule) {

  var messages = this.getForm().opts.messages;

  var message = this.messages[rule] ? this.messages[rule] : messages[rule];

  if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) == 'object') {
    message = extractMessage(rule, message, this);
  }

  var params = this.Rules[rule];

  if (isMomentObject(params)) {
    message = message.replace("{0}", params.format(this.format));
  } else if (Array.isArray(params)) {
    params.forEach(function (param, index) {
      if (this.fieldType === 'date') {
        param = typeof param === 'string' ? moment(param) : param;
      }
      message = message.replace("{" + index + "}", !isMomentObject(param) ? param : param.format(this.format));
    }.bind(this));
  } else if (typeof params == 'number' || typeof params == 'string') {
    message = message.replace("{0}", params);
    if (typeof params == 'string') {
      var relatedField = this.getField(params);
      if (relatedField) message = message.replace(":relatedField", stripLabel(relatedField.label));
    }
  }

  message = message.replace(":field", this.label ? stripLabel(this.label) : this.Name);

  if (this.fieldType == 'date') message = message.replace(":format", this.format);

  return message;
};

function extractMessage(rule, message, field) {

  if (field.Rules.number || field.Rules.integer) return message.number;

  if (['date', 'partialdate'].indexOf(field.fieldType) > -1) return message.date;

  return message.string;
}

function stripLabel(label) {
  return label ? label.replace(/<(?:.|\n)*?>/gm, '') : '';
}

function isMomentObject(param) {
  return typeof param.isValid != 'undefined';
}

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}