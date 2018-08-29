module.exports = function(that, trigger, values) {

  if (!trigger) return true;

  var triggerValue = trigger.value;

  if (!values) return !!triggerValue;

  if (triggerValue==null) return false;

  values = values.split(",");

  var value = typeof triggerValue == 'object'?triggerValue:[triggerValue];
  return !!values.filter(function(n) {
    value = '' + value;
    return value.indexOf(n) != -1;
  }).length;

}

