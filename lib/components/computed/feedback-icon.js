module.exports = function() {
    if (this.errors.length) return "remove";
    if (this.success) return "ok";
    return "";
  }
