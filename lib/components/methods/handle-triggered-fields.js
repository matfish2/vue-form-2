module.exports = function() {
  if (typeof this.triggeredFields!='undefined') {
    this.triggeredFields.forEach(function(field){
      field.triggerOn();
    });
  }
}
