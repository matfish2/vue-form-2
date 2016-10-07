module.exports = function() {
    for (var trigger in this.triggers) {
      var triggerField = this.triggers[trigger].split(":")[0];
            if (typeof this.triggeredFields[triggerField]=='undefined') {
              this.triggeredFields[triggerField] = [];
            }
            this.triggeredFields[triggerField].push(trigger);
    }

}
