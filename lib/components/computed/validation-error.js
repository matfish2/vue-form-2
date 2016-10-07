module.exports = function() {
    return this.errors.length?this.getMessage(this.errors[0]):'';
  }
