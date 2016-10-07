var isTriggerOn = require('../../trigger/trigger-on');

module.exports = function() {

  if (!this.trigger) {
    this.shouldShow = true;
    return;
  }

  var params = this.trigger.split(":");

  var triggerName = params[0];
  var values = params.length>1?params[1]:false;

  this.shouldShow = isTriggerOn(this,  this.getField(triggerName), values);

}
