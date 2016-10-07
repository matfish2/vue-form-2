module.exports = function(rule) {

  let messages = this.getForm().opts.messages;

    let message = this.messages[rule]?
    this.messages[rule]:
    messages[rule];

    if (typeof message=='object') {
      message = extractMessage(rule, message, this);
    }

    let params = this.Rules[rule];

    if (isMomentObject(params)) {
       message = message.replace("{0}", params.format(this.format));
    }
    else if (Array.isArray(params)) {
    params.forEach(function(param, index) {
        message = message.replace("{" + index + "}", !isMomentObject(param)?param:param.format(this.format));
    }.bind(this));
  }
  else if (typeof params=='number' || typeof params=='string') {
       message = message.replace("{0}", params);
       if (typeof params=='string') {
        var relatedField  = this.getField(params);
      if (relatedField)
       message = message.replace(":relatedField", stripLabel(relatedField.label));
       }
  }

    message = message.replace(":field", this.label?stripLabel(this.label):this.name);

    if (this.fieldType=='date')
    message = message.replace(":format", this.format);


    return message;
  }


  function extractMessage(rule, message, field) {

    if (field.Rules.number || field.Rules.integer)
      return message.number;

        if (rule=='between' && typeof field.Rules[rule][0]=='object' ||
        ['min','max'].indexOf(rule)>-1 && typeof field.Rules[rule]=='object')
      return message.date;

    return message.string;
  }


function stripLabel(label) {
    return label.replace(/<(?:.|\n)*?>/gm, '');
}

function isMomentObject(param) {
  return typeof param.isValid!='undefined';
}

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
