module.exports = function() {
  var triggers = this.getForm().triggers;
  return triggers.hasOwnProperty(this.name)?triggers[this.name]:false;
}
