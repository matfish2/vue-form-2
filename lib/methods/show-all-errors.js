module.exports = function() {
  this.errors.forEach(function(error) {
    var field = this.getField(error.name);
    if (field.errors.indexOf(error.rule)==-1) {
      field.errors.push(error.rule);
      field.hadErrors = true;
    }
    error.show = true;
  }.bind(this));
}
